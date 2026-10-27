"use server";

import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { getDb, type UserDoc } from "@/app/lib/server/db";
import { endSession, requireAdmin, startSession } from "@/app/lib/server/session";

export type FormState = { error?: string; ok?: string } | undefined;

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
const MIN_PASSWORD = 8;

// Compared against when the email has no account, so a wrong email takes as
// long as a wrong password and response time doesn't reveal which emails exist.
let dummyHash: Promise<string> | undefined;

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const db = await getDb();
  const attempts = db.collection<{ email: string; ts: Date }>("login_attempts");
  const recent = await attempts.countDocuments({
    email,
    ts: { $gte: new Date(Date.now() - LOCK_MINUTES * 60 * 1000) },
  });
  if (recent >= MAX_ATTEMPTS) {
    return { error: `Too many attempts. Try again in ${LOCK_MINUTES} minutes.` };
  }

  const user = await db.collection<UserDoc>("users").findOne({ email });
  dummyHash ??= bcrypt.hash("not-a-real-password", 12);
  const ok = await bcrypt.compare(password, user?.passwordHash ?? (await dummyHash));
  if (!user || !ok) {
    await attempts.insertOne({ email, ts: new Date() });
    return { error: "That email and password don't match." };
  }

  await attempts.deleteMany({ email });
  await startSession(user);
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function changePassword(_: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < MIN_PASSWORD)
    return { error: `The new password must be at least ${MIN_PASSWORD} characters.` };
  if (next !== confirm) return { error: "The two new passwords don't match." };
  if (next === current) return { error: "The new password must be different." };

  const users = (await getDb()).collection<UserDoc>("users");
  const user = await users.findOne({ _id: new ObjectId(admin.id) });
  if (!user || !(await bcrypt.compare(current, user.passwordHash))) {
    return { error: "Your current password is incorrect." };
  }

  const passwordChangedAt = new Date();
  await users.updateOne(
    { _id: user._id },
    { $set: { passwordHash: await bcrypt.hash(next, 12), passwordChangedAt } },
  );
  // Other devices are now signed out (their sessions carry the old
  // timestamp); keep this one signed in with a fresh session.
  await startSession({ ...user, passwordChangedAt });
  return { ok: "Password updated. Other devices have been signed out." };
}
