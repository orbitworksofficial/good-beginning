import Link from "next/link";
import { site } from "../lib/site";
import { ArrowIcon } from "./Icons";
import { BlockStack, RainbowArc } from "./Decor";

export default function CtaBand({
  title = "Let's witness the growth and transformation of your child",
  body = "Reach out to us now to learn more about our programs and schedule a tour.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="reveal relative overflow-hidden rounded-block-lg border-[3px] border-ink bg-berry px-6 py-16 sm:px-12 sm:py-20"
          style={{ boxShadow: "10px 10px 0 0 #2A2140" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.18]" />

          <RainbowArc
            className="pointer-events-none absolute -left-16 -top-10 h-44 w-72 opacity-25"
            strokeWidth={18}
          />
          <BlockStack className="pointer-events-none absolute -bottom-6 right-4 hidden h-40 w-40 opacity-90 sm:block" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-display-sm font-black text-white sm:text-[2.75rem]">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
              {body}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/enroll" className="btn-sunshine w-full sm:w-auto">
                Schedule a Tour
                <ArrowIcon />
              </Link>
              <a href={site.phoneHref} className="btn-secondary w-full sm:w-auto">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
