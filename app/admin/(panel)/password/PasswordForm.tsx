"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePassword } from "../../actions";

const FIELDS = [
  { name: "current", label: "Current password", auto: "current-password" },
  { name: "next", label: "New password", auto: "new-password" },
  { name: "confirm", label: "Confirm new password", auto: "new-password" },
];

export default function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={action} className="space-y-5">
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="label">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type="password"
            autoComplete={f.auto}
            required
            minLength={f.name === "current" ? undefined : 8}
            className="field mt-1.5"
          />
        </div>
      ))}
      {state?.error ? (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {state.ok}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
        {pending ? "Saving…" : "Update password"}
      </button>
    </form>
  );
}
