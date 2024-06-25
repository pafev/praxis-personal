import { NextResponse, type NextRequest } from "next/server";
import { getUrlByPath } from "./lib/getUrlByPath";
import { type Session } from "next-auth";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/login")) {
    const session = (await (
      await fetch(process.env.NEXTAUTH_URL + "/api/auth/session", {
        method: "GET",
        headers: {
          ...Object.fromEntries(request.headers),
        },
      })
    ).json()) as Session;

    return session?.user?.id
      ? NextResponse.redirect(getUrlByPath("/"))
      : NextResponse.next();
  }

  if (
    pathname.startsWith("/admin") ||
    (pathname.startsWith("/blog") && pathname.endsWith("/edit")) ||
    pathname.startsWith("/blog/create")
  ) {
    const session = (await (
      await fetch(process.env.NEXTAUTH_URL + "/api/auth/session", {
        method: "GET",
        headers: {
          ...Object.fromEntries(request.headers),
        },
      })
    ).json()) as Session;

    return session?.user?.id
      ? NextResponse.next()
      : NextResponse.redirect(getUrlByPath("/login"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path?", "/login", "/blog/:path?/edit", "/blog/create"],
};
