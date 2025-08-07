import { NextRequest } from "next/server";
import { env } from "@lib/env";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ message: "query 파라미터는 필수입니다." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=5`,
      {
        headers: {
          "X-Naver-Client-Id": env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": env.NAVER_CLIENT_SECRET!,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ message: "Naver API 호출 실패", error }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.debug("네이버 검색 API 에러:", err);
    return new Response(JSON.stringify({ message: "서버 에러" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
