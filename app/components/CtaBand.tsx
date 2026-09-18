import Link from "next/link";
import { site } from "../lib/site";

export default function CtaBand({
  title = "Schedule a visit to Good Beginnings",
  body = "Reach out to learn more about our programs and arrange a tour of our classrooms.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-coral-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(238,130,86,0.85),transparent_62%)]"
      />
      <div className="container-x relative py-14 sm:py-16">
        <div className="reveal flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-h2 font-semibold text-white">{title}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              {body}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link href="/enroll" className="btn-light">
              Schedule a Tour
            </Link>
            <a href={site.phoneHref} className="btn-outline-light">
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
