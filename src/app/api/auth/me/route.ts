import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");

  const isLogin = !!accessToken;

  return NextResponse.json({ isLogin });
}
