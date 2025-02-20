import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/utils/cookies";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  let token = "";
  if (session) {
    const datas = session?.token?.split(",between,");
    token = datas[0];
  }

  const { pathname } = request.nextUrl.clone();

  if (pathname !== "/sign-in" && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (pathname === "/sign-in" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  NextResponse.next();
  return await updateSession(request);
}

export const config = {
  matcher:
    // "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|menu).*)",
};
