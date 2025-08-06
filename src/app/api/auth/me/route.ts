import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");

  const isLogin = !!accessToken;
  console.log("로그인 상태 확인:", { isLogin, hasToken: !!accessToken });

  if (isLogin) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_SSL}/api/members/info`, {
        headers: {
          Cookie: `accessToken=${accessToken.value}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        return NextResponse.json({
          isLogin: !!accessToken,
          user: userData,
        });
      }
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
    }
  }

  return NextResponse.json({ isLogin: !!accessToken });
}
