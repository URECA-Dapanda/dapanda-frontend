import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken");

  const isLogin = !!refreshToken;

  if (isLogin) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_SSL}/api/members/info`, {
        headers: {
          Cookie: `accessToken=${refreshToken.value}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        return NextResponse.json({
          isLogin: !!refreshToken,
          user: userData.data,
        });
      }
    } catch (error) {
      console.debug("사용자 정보 조회 실패:", error);
    }
  }

  return NextResponse.json({ isLogin: !!refreshToken });
}
