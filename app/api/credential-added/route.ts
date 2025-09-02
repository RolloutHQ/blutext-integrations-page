import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { credentialId, userId, appKey } = (body || {}) as {
      credentialId?: string;
      userId?: string;
      appKey?: string | null;
    };
    // Avoid logging full payloads; only log keys in non-production
    if (process.env.NODE_ENV !== "production") {
      console.log("[credential-added] Received keys:", Object.keys(body || {}));
    }
    // Optionally emit minimal, non-PII metadata
    console.info("[credential-added] Ack", {
      hasCredentialId: Boolean(credentialId),
      hasUserId: Boolean(userId),
      hasAppKey: Boolean(appKey),
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[credential-added] Error:", e?.message || e);
    return NextResponse.json({ ok: false, error: e?.message || "Invalid JSON" }, { status: 400 });
  }
}
