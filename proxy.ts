import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "./app/lib/server/jwt";

/**
 * Keeps /admin behind the login page. This is the fast first gate (signature
 * and expiry only); admin pages and actions also check the session against
 * the database via requireAdmin().
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/admin/login") {
    return session
      ? NextResponse.redirect(new URL("/admin", request.url))
      : NextResponse.next();
  }
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
