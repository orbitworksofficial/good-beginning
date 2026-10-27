import "server-only";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb, type UserDoc } from "./db";
import {
  SESSION_COOKIE,
  SESSION_DAYS,
  signSession,
  verifySession,
} from "./jwt";

export type AdminUser = { id: string; email: string; name: string };

/** Sets the session cookie. Only callable from a Server Action / Route Handler. */
export async function startSession(user: UserDoc & { _id: ObjectId }) {
  const token = await signSession({
    sub: user._id.toHexString(),
    email: user.email,
    pv: user.passwordChangedAt.getTime(),
  });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/**
 * The signed-in admin, checked against the database: a session issued before
 * the latest password change is rejected, so changing the password signs out
 * every other device.
 */
export async function getAdmin(): Promise<AdminUser | null> {
  const session = await verifySession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session || !ObjectId.isValid(session.sub)) return null;
  const db = await getDb();
  const user = await db
    .collection<UserDoc>("users")
    .findOne({ _id: new ObjectId(session.sub) });
  if (!user || user.passwordChangedAt.getTime() !== session.pv) return null;
  return { id: user._id.toHexString(), email: user.email, name: user.name };
}

/** For admin pages and actions: the admin, or a redirect to the login page. */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdmin();
  // Not straight to /admin/login: a cookie that is validly signed but stale
  // (password since changed) would make proxy.ts bounce back here forever.
  // /admin/logout clears it first.
  if (!admin) redirect("/admin/logout");
  return admin;
}
