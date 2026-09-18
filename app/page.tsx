import Image from "next/image";
import Link from "next/link";
import CtaBand from "./components/CtaBand";
import SectionHeading from "./components/SectionHeading";
import { ArrowIcon, CheckIcon, iconMap } from "./components/Icons";
import { BlockDots, BlockStack, RainbowArc, Squiggle } from "./components/Decor";
import {
  about,
  enrollSteps,
  hero,
  highlights,
  pillars,
  programs,
  site,
  whyUs,
} from "./lib/site";

const CAP: Record<string, string> = {
  periwinkle: "bg-periwinkle",
  coral: "bg-coral",
  sky: "bg-jade",
  leaf: "bg-sunshine",
};

const PILLAR_CAP = ["bg-tomato", "bg-sunshine", "bg-jade", "bg-bubblegum"];
const PILLAR_ICON = [
  "bg-tomato text-white",
  "bg-sunshine text-ink",
  "bg-jade text-white",
  "bg-bubblegum text-ink",
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b-[3px] border-ink bg-cream">
        <div className="pointer-events-none absolute inset-0 bg-grid-blocks opacity-60" />
        {/* Hidden on small screens, where it would sit behind the headline. */}
        <RainbowArc className="pointer-events-none absolute -left-24 top-6 hidden h-60 w-[26rem] opacity-40 lg:block" />

        <div className="container-x relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
          <div className="reveal">
            <p className="eyebrow">{hero.eyebrow}</p>

            <h1 className="mt-7 font-display text-display-sm font-black text-ink sm:text-[3.5rem] sm:leading-[1.0] lg:text-display-lg">
              A day full of{" "}
              <span className="relative inline-block whitespace-nowrap text-berry">
                discoveries
                <Squiggle className="absolute -bottom-3 left-0 h-4 w-full text-sunshine" />
              </span>{" "}
              and knowledge
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
              {hero.body}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={hero.primaryCta.href} className="btn-primary">
                {hero.primaryCta.label}
                <ArrowIcon />
              </Link>
              <Link href={hero.secondaryCta.href} className="btn-secondary">
                {hero.secondaryCta.label}
              </Link>
            </div>

            {/* Stats as little blocks */}
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-3">
              {about.stats.slice(0, 3).map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col justify-center rounded-block border-[3px] border-ink px-4 py-3.5 text-center shadow-pop-sm ${
                    ["bg-sunshine", "bg-jade", "bg-bubblegum"][i]
                  }`}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-[1.75rem] font-black leading-none text-ink">
                      {s.value}
                    </span>
                    <span className="mt-1.5 block text-[0.7rem] font-bold leading-tight text-ink/70">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero image, tilted in a block frame */}
          <div className="reveal relative">
            <div className="relative mx-auto max-w-lg">
              <div
                className="relative rotate-2 overflow-hidden rounded-block-lg border-[3px] border-ink bg-white p-2.5 transition-transform duration-500 hover:rotate-0"
                style={{ boxShadow: "10px 10px 0 0 #2A2140" }}
              >
                <Image
                  src="/images/classroom-circle.png"
                  alt="Teachers and children sitting together during circle time at Good Beginnings"
                  width={690}
                  height={460}
                  priority
                  className="h-full w-full rounded-[0.9rem] object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -left-4 -rotate-3 rounded-block border-[3px] border-ink bg-tomato px-5 py-3 text-white shadow-pop-sm sm:-left-10">
                <span className="block font-display text-xl font-black leading-none">
                  Since {site.established}
                </span>
                <span className="mt-1 block text-[0.7rem] font-bold text-white/85">
                  Trusted by Laurel families
                </span>
              </div>

              <BlockStack className="absolute -right-6 -top-12 hidden h-28 w-28 animate-wiggle sm:block" />
            </div>
          </div>
        </div>

        {/* Highlight strip */}
        <div className="relative border-t-[3px] border-ink bg-berry">
          <ul className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 text-sm font-bold text-white"
              >
                <CheckIcon className="h-4 w-4 text-sunshine" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= PILLARS ================= */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              eyebrow="What's included"
              title="Everything your child needs, in one place"
              underline="one place"
            />
            <p className="reveal max-w-xl text-base leading-relaxed text-ink/70 lg:pb-2">
              Our program is built around four commitments that shape every
              single day at Good Beginnings.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => {
              const Icon = iconMap[p.icon as keyof typeof iconMap];
              return (
                <article
                  key={p.title}
                  className={`block-card block-card-hover reveal overflow-hidden ${
                    i % 2 === 1 ? "lg:mt-8" : ""
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={`block-cap ${PILLAR_CAP[i % 4]}`} />
                  <div className="p-6">
                    <span
                      className={`inline-grid h-12 w-12 place-items-center rounded-block border-[3px] border-ink ${PILLAR_ICON[i % 4]}`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold text-ink">
                      {p.title}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {p.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed text-ink/70"
                        >
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section border-y-[3px] border-ink bg-sand">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-5">
              <div
                className="-rotate-2 overflow-hidden rounded-block-lg border-[3px] border-ink bg-white p-2"
                style={{ boxShadow: "8px 8px 0 0 #2A2140" }}
              >
                <Image
                  src="/images/child-play.jpg"
                  alt="A child playing at Good Beginnings"
                  width={600}
                  height={800}
                  className="h-full w-full rounded-[0.7rem] object-cover"
                />
              </div>
              <div
                className="mt-10 rotate-2 overflow-hidden rounded-block-lg border-[3px] border-ink bg-white p-2"
                style={{ boxShadow: "8px 8px 0 0 #2A2140" }}
              >
                <Image
                  src="/images/kids-art.jpg"
                  alt="Children working on an art activity"
                  width={600}
                  height={800}
                  className="h-full w-full rounded-[0.7rem] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Who we are"
              title={about.heading}
              underline="since 1999"
            />
            <div className="reveal mt-6 space-y-4">
              {about.paragraphs.slice(0, 3).map((p) => (
                <p
                  key={p.slice(0, 32)}
                  className="text-base leading-relaxed text-ink/70"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="reveal mt-9">
              <Link href="/about-us" className="btn-primary">
                More about us
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section id="programs" className="section scroll-mt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Programs we offer"
            title="Now is the time to invest in your child's education"
            body="From first steps to kindergarten readiness, each program is shaped around where your child is right now."
            align="center"
            underline="invest"
          />

          <BlockDots className="mt-8" />

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <article
                key={p.name}
                className={`block-card block-card-hover reveal group overflow-hidden ${
                  i % 3 === 1 ? "lg:mt-10" : i % 3 === 2 ? "lg:mt-5" : ""
                }`}
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              >
                <div className={`block-cap ${CAP[p.color] ?? "bg-periwinkle"}`} />
                <div className="relative aspect-[4/3] overflow-hidden border-b-[3px] border-ink">
                  <Image
                    src={p.image}
                    alt={`${p.name} program at Good Beginnings`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-flex rounded-lg border-[3px] border-ink bg-cream px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-ink">
                    {p.age}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {p.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="section border-y-[3px] border-ink bg-ink">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why choose us"
            title="Phenomenal teachers, and a place that feels like home"
            body="We realize that your child is precious and needs many opportunities for growth and discovery."
            align="center"
            light
            underline="like home"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <article
                key={w.title}
                className="reveal rounded-block-lg border-[3px] border-white/25 bg-white/[0.07] p-7 transition hover:bg-white/[0.12]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-block border-[3px] border-ink font-display text-lg font-black text-ink ${
                    ["bg-sunshine", "bg-jade", "bg-bubblegum", "bg-coral"][i % 4]
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  {w.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {w.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ENROLLMENT ================= */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Enrollment process"
            title="Three simple steps to join us"
            body="Still have questions? Please contact us anytime — we look forward to hearing from you."
            align="center"
            underline="three simple steps"
          />

          <ol className="mt-14 grid gap-7 md:grid-cols-3">
            {enrollSteps.map((s, i) => (
              <li
                key={s.step}
                className={`block-card reveal overflow-hidden ${
                  i === 1 ? "md:mt-8" : ""
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`block-cap ${["bg-tomato", "bg-sunshine", "bg-jade"][i]}`}
                />
                <div className="p-8">
                  <span className="font-display text-6xl font-black leading-none text-ink/12">
                    {s.step}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="reveal mt-12 text-center">
            <Link href="/enroll" className="btn-primary">
              Start enrolling
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
