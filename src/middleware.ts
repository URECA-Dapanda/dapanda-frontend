import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/mypage", "/data", "/chat", "/map"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken");

  const isProtected = protectedRoutes.some((path) => {
    return req.nextUrl.pathname.startsWith(path);
  });

  if (isProtected && !token) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// middleware.ts
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
