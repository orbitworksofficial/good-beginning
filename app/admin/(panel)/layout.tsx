import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/app/lib/server/session";
import { logout } from "../actions";
import AdminNav from "../_components/AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex shrink-0 items-center gap-3">
            <Image src="/images/logo.png" alt="" width={168} height={124} className="h-9 w-auto" />
            <span className="hidden text-sm font-semibold text-navy sm:block">Admin</span>
          </Link>
          <AdminNav />
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 md:block">{admin.email}</span>
            <Link
              href="/"
              target="_blank"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-navy sm:block"
            >
              View site ↗
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-navy transition hover:bg-slate-50"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </>
  );
}
