import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-coral/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-coral-light blur-3xl"
      />
      <div className="relative w-full max-w-sm">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="Good Beginnings"
            width={168}
            height={124}
            priority
            className="mx-auto h-16 w-auto"
          />
          <h1 className="mt-6 text-2xl font-semibold text-navy">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Website traffic and settings for Good Beginnings.
          </p>
        </div>
        <div className="card mt-8 p-6 sm:p-7">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          <Link href="/" className="transition hover:text-coral">
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}
