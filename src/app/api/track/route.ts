import { NextResponse } from "next/server";

/**
 * GET /api/track?token=<48 hex chars>
 *
 * Server-side proxy to the PHP tracking endpoint. Keeps the backend
 * hostname out of the browser and lets us fail gracefully.
 */

export const runtime = "nodejs";

const API_BASE = process.env.TW_API_BASE ?? "https://translationwindows.net/api/v1";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";

  if (!/^[0-9a-f]{48}$/.test(token)) {
    return NextResponse.json(
      {
        ok: false,
        code: "invalid_token",
        error: "That tracking link is not valid. Please use the link from your confirmation email.",
      },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`${API_BASE}/portal.php?token=${encodeURIComponent(token)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (error) {
    console.error("[TW] tracking lookup failed:", error);
    return NextResponse.json(
      {
        ok: false,
        code: "unavailable",
        error: "We could not load your project just now. Please try again shortly.",
      },
      { status: 503 }
    );
  }
}
