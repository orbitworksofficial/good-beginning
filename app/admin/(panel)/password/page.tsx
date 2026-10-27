import type { Metadata } from "next";
import PasswordForm from "./PasswordForm";

export const metadata: Metadata = { title: "Change password" };

export default function PasswordPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-navy">Change password</h1>
      <p className="mt-1.5 text-sm text-slate-600">
        Use at least 8 characters. Changing it signs you out on every other device.
      </p>
      <div className="card mt-6 p-6 sm:p-7">
        <PasswordForm />
      </div>
    </div>
  );
}
