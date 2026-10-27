import { jwtVerify, SignJWT } from "jose";

/**
 * Signed session token for the admin area. Kept free of database imports so
 * proxy.ts can verify it cheaply on every /admin request.
 */

export const SESSION_COOKIE = "gb_admin";
export const SESSION_DAYS = 7;

export type SessionPayload = {
  sub: string; // user id
  email: string;
  pv: number; // passwordChangedAt (ms) when the session was issued
};

function key() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET must be set to a random string of at least 32 characters.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT({ email: payload.email, pv: payload.pv })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(key());
}

export async function verifySession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string")
      return null;
    return { sub: payload.sub, email: payload.email, pv: Number(payload.pv) };
  } catch {
    return null;
  }
}
