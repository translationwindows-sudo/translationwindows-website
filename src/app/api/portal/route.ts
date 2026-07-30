import { NextResponse } from "next/server";

/**
 * Customer portal proxy.
 *
 * GET  /api/portal?token=…      full portal payload
 * POST /api/portal              forwards an action to the backend
 *
 * The browser never contacts Hostinger directly, and the tracking token
 * is validated for shape here before any request leaves our server.
 */

export const runtime = "nodejs";

const API_BASE = process.env.TW_API_BASE ?? "https://translationwindows.net/api/v1";

const bad = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!/^[0-9a-f]{48}$/.test(token)) {
    return bad("That tracking link is not valid. Please use the link from your confirmation email.");
  }

  try {
    const upstream = await fetch(`${API_BASE}/portal.php?token=${encodeURIComponent(token)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    return NextResponse.json(await upstream.json(), { status: upstream.status });
  } catch (error) {
    console.error("[TW] portal fetch failed:", error);
    return bad("We could not load your project just now. Please try again shortly.", 503);
  }
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("We could not read that request.");
  }

  const token = String(form.get("token") ?? "");
  if (!/^[0-9a-f]{48}$/.test(token)) return bad("That tracking link is not valid.");

  try {
    const upstream = await fetch(`${API_BASE}/portal.php`, {
      method: "POST",
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });
    return NextResponse.json(await upstream.json(), { status: upstream.status });
  } catch (error) {
    console.error("[TW] portal action failed:", error);
    return bad("We could not complete that just now. Please try again, or message us on WhatsApp.", 503);
  }
}
