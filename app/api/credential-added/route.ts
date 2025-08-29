import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[credential-added] Received:", body);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[credential-added] Error:", e?.message || e);
    return NextResponse.json({ ok: false, error: e?.message || "Invalid JSON" }, { status: 400 });
  }
}

