import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get("accessToken");

  const isLogin = !!refreshToken;

  return NextResponse.json({ isLogin });