import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const jsonwebtoken = require("jsonwebtoken");

function genToken(userId: string) {
  const clientId = process.env.ROLLOUT_CLIENT_ID;
  const clientSecret = process.env.ROLLOUT_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing env: ROLLOUT_CLIENT_ID and/or ROLLOUT_CLIENT_SECRET"
    );
  }

  const nowSecs = Math.round(new Date().valueOf() / 1000);

  return jsonwebtoken.sign(
    {
      iss: clientId,
      sub: userId,
      iat: nowSecs,
      exp: nowSecs + 60 * 60,
    },
    clientSecret,
    { algorithm: "HS512" },
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  try {
    const token = genToken(userId as string);
    return NextResponse.json({ token });
  } catch (err: any) {
    console.error("/api/rollout-token error:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Failed to generate token" },
      { status: 500 }
    );
  }
}
