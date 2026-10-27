import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/app/lib/server/jwt";

/** Clears the admin session cookie and returns to the login page. */
export function GET(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", request.url));
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
