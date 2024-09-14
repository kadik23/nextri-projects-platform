import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_session")?.value;
  const url = req.nextUrl.clone();

  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  if (token && url.pathname.startsWith("/auth")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/auth"],
};
