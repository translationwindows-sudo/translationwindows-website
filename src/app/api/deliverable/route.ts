import { NextResponse } from "next/server";

/**
 * GET /api/deliverable?token=…&file=…
 *
 * Streams a finished file to the customer. The backend enforces that the
 * file belongs to that token's project AND is marked 'delivered' — source
 * documents can never be fetched through this route.
 */

export const runtime = "nodejs";

const API_BASE = process.env.TW_API_BASE ?? "https://translationwindows.net/api/v1";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const file = url.searchParams.get("file") ?? "";

  if (!/^[0-9a-f]{48}$/.test(token) || !/^\d+$/.test(file)) {
    return NextResponse.json({ ok: false, error: "Invalid download link." }, { status: 400 });
  }

  try {
    const upstream = await fetch(
      `${API_BASE}/deliverable.php?token=${encodeURIComponent(token)}&file=${encodeURIComponent(file)}`,
      { cache: "no-store", signal: AbortSignal.timeout(60_000) }
    );

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "That file is not available. Please contact your Project Coordinator." },
        { status: upstream.status }
      );
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream",
        "Content-Disposition": upstream.headers.get("content-disposition") ?? "attachment",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("[TW] deliverable proxy failed:", error);
    return NextResponse.json(
      { ok: false, error: "We could not fetch that file just now. Please try again shortly." },
      { status: 503 }
    );
  }
}
