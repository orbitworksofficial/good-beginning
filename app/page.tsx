import Image from "next/image";
import Link from "next/link";
import CtaBand from "./components/CtaBand";
import SectionHeading from "./components/SectionHeading";
import { ArrowIcon, CheckIcon, iconMap } from "./components/Icons";
import {
  about,
  enrollSteps,
  hero,
  highlights,
  ourProgram,
  pillars,
  programs,
  site,
  whyUs,
} from "./lib/site";

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden">
        {/* Full-bleed photograph */}
        <Image
          src="/images/classroom-hands.jpg"
          alt="Children raising their hands during class at Good Beginnings"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />

        {/* Warm scrim: dark on the left so the copy stays legible, clearing to
            the right so the classroom itself is still visible. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent"
        />

        <div className="container-x flex min-h-[34rem] items-center py-16 sm:py-20 lg:min-h-[42rem]">
          <div className="reveal max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
              {hero.eyebrow}
            </p>
            <h1 className="mt-5 text-h1 font-semibold text-white lg:text-h1-lg">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {hero.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={hero.primaryCta.href} className="btn-primary">
                {hero.primaryCta.label}
                <ArrowIcon />
              </Link>
              <Link href={hero.secondaryCta.href} className="btn-outline-light">
                {hero.secondaryCta.label}
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/20 pt-8">
              {about.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold text-white">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-white/70">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Highlight strip */}
      <div className="border-b border-coral-light bg-coral-tint">
        <ul className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4">
          {highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2 text-sm font-medium text-navy"
            >
              <CheckIcon className="h-4 w-4 text-coral" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* ================= PILLARS ================= */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="What's included"
            title="Everything your child needs, in one place"
            body="Our program is built around four commitments that shape every single day at Good Beginnings."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => {
              const Icon = iconMap[p.icon as keyof typeof iconMap];
              return (
                <article
                  key={p.title}
                  className="card card-hover reveal p-6"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="inline-grid h-11 w-11 place-items-center rounded-lg bg-coral-light text-coral">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy">
                    {p.title}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-slate-600"
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section border-y border-coral-light bg-coral-tint">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal order-2 grid grid-cols-2 gap-4 lg:order-1">
            <div className="overflow-hidden rounded-xl shadow-card">
              <Image
                src="/images/child-play.jpg"
                alt="A child playing at Good Beginnings"
                width={600}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-8 overflow-hidden rounded-xl shadow-card">
              <Image
                src="/images/kids-art.jpg"
                alt="Children working on an art activity"
                width={600}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Who we are" title={about.heading} />
            <div className="reveal mt-5 space-y-4">
              {about.paragraphs.slice(0, 3).map((p) => (
                <p
                  key={p.slice(0, 32)}
                  className="text-base leading-relaxed text-slate-600"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="reveal mt-8">
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
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <article
                key={p.name}
                className="card card-hover reveal group overflow-hidden"
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} program at Good Beginnings`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-coral">
                    {p.age}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-navy">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {p.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MORE THAN A PRESCHOOL ================= */}
      <section className="section pt-0 sm:pt-0">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our program"
              title="More than a preschool"
              body={ourProgram.intro}
            />
            <ul className="reveal mt-8 grid gap-3 sm:grid-cols-2">
              {ourProgram.groups.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/our-program#${g.id}`}
                    className="card card-hover flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-navy hover:text-coral"
                  >
                    {g.title}
                    <ArrowIcon className="h-4 w-4 shrink-0 text-coral" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="reveal mt-8">
              <Link href="/our-program" className="btn-primary">
                Explore our program
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 gap-4">
            {ourProgram.groups.slice(0, 4).map((g, i) => (
              <div
                key={g.id}
                className={`relative aspect-square overflow-hidden rounded-xl shadow-card ${
                  i % 2 === 1 ? "translate-y-6" : ""
                }`}
              >
                <Image
                  src={g.image}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="section border-y border-coral-light bg-coral-tint">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why choose us"
            title="Phenomenal teachers, and a place that feels like home"
            body="We realize that your child is precious and needs many opportunities for growth and discovery."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <article
                key={w.title}
                className="card reveal p-6"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral-light text-sm font-semibold text-coral">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {w.body}
                    </p>
                  </div>
                </div>
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
          />

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {enrollSteps.map((s, i) => (
              <li
                key={s.step}
                className="card reveal p-7"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-coral text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="reveal mt-10 text-center">
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
