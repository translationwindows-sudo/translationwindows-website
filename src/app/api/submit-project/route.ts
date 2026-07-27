import crypto from "node:crypto";

import { NextResponse } from "next/server";

/**
 * POST /api/submit-project
 *
 * Server-side bridge between the browser and the Hostinger PHP API.
 *
 * The browser NEVER talks to Hostinger directly, and never sees the shared
 * secret. This route receives the multipart submission, signs the JSON
 * payload with HMAC-SHA256, and forwards everything to the backend.
 *
 * Environment variables required:
 *   TW_API_BASE    e.g. https://translationwindows.net/api/v1
 *   TW_API_SECRET  the same 64-char string that is in config.php
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const API_BASE = process.env.TW_API_BASE ?? "https://translationwindows.net/api/v1";
const SECRET = process.env.TW_API_SECRET ?? "";

/** Calm, customer-facing failure with a route to a human. */
function failure(message: string, code = "submission_failed", status = 502) {
  return NextResponse.json({ ok: false, code, error: message }, { status });
}

export async function POST(request: Request) {
  if (!SECRET) {
    console.error("[TW] TW_API_SECRET is not configured");
    return failure(
      "We could not submit your project just now. Please message us on WhatsApp and we will take it from there.",
      "not_configured",
      500
    );
  }

  let incoming: FormData;
  try {
    incoming = await request.formData();
  } catch {
    return failure("We could not read your submission. Please try again.", "invalid_request", 400);
  }

  const payload = incoming.get("payload");
  if (typeof payload !== "string" || payload.length === 0) {
    return failure("Your submission was incomplete. Please try again.", "invalid_payload", 400);
  }

  // ── sign: HMAC-SHA256( timestamp + "." + payload ) ──────────────────
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  // ── rebuild the multipart body for the PHP endpoint ─────────────────
  const outgoing = new FormData();
  outgoing.append("payload", payload);

  for (const [key, value] of incoming.entries()) {
    if (key === "payload") continue;
    if (value instanceof File) {
      outgoing.append("files[]", value, value.name);
    } else {
      // file_roles[] arrives as repeated string fields
      outgoing.append(key, value);
    }
  }

  try {
    const upstream = await fetch(`${API_BASE}/projects.php`, {
      method: "POST",
      headers: {
        "X-TW-Timestamp": timestamp,
        "X-TW-Signature": signature,
      },
      body: outgoing,
      cache: "no-store",
      signal: AbortSignal.timeout(45_000),
    });

    const text = await upstream.text();

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("[TW] backend returned non-JSON:", text.slice(0, 300));
      return failure(
        "We could not save your project. Nothing was lost on your side — please try again, or message us on WhatsApp."
      );
    }

    // Pass the backend's own status and message through unchanged, so the
    // customer sees the real reason (file too large, rate limited, etc).
    return NextResponse.json(data, { status: upstream.status });
  } catch (error) {
    console.error("[TW] submission bridge failed:", error);
    return failure(
      "We could not reach our system just now. Your details have not been lost — please try again in a moment, or message us on WhatsApp."
    );
  }
}
