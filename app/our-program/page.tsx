import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "../components/CtaBand";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { ArrowIcon, CheckIcon } from "../components/Icons";
import { ourProgram, programs } from "../lib/site";

export const metadata: Metadata = {
  title: "Our Program",
  description:
    "More than a preschool: daily curriculum, soccer and music, cooking classes, field trips, magic shows, and a close partnership with families at Good Beginnings in Laurel, MD.",
};

export default function OurProgramPage() {
  return (
    <>
      <PageHero
        eyebrow={ourProgram.eyebrow}
        title={ourProgram.title}
        body={ourProgram.intro}
      />

      {/* Intro: whole-child pillars + photos */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What we offer"
              title="Nurturing the whole child"
              body="Every day balances learning, movement, creativity, and connection, so children grow in every direction."
            />
            <ul className="reveal mt-8 grid grid-cols-2 gap-3">
              {ourProgram.pillars.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 rounded-lg border border-coral-light bg-coral-tint px-4 py-3 text-sm font-medium text-navy"
                >
                  <CheckIcon className="h-4 w-4 shrink-0 text-coral" />
                  {p}
                </li>
              ))}
            </ul>
            <nav
              aria-label="Program sections"
              className="reveal mt-8 flex flex-wrap gap-2"
            >
              {ourProgram.groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-navy transition hover:border-coral hover:text-coral"
                >
                  {g.title}
                </a>
              ))}
              <a
                href="#families"
                className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-navy transition hover:border-coral hover:text-coral"
              >
                Families
              </a>
            </nav>
          </div>

          <div className="reveal grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-xl shadow-card">
              <Image
                src="/images/ourimages/gb-3.jpeg"
                alt="Two children watering the school vegetable garden"
                width={800}
                height={740}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
            <div className="mt-10 overflow-hidden rounded-xl shadow-card">
              <Image
                src="/images/ourimages/gb-6.jpeg"
                alt="Children listening to a visiting musician in the classroom"
                width={800}
                height={594}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program groups, alternating image side */}
      {ourProgram.groups.map((g, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={g.id}
            id={g.id}
            className={`section scroll-mt-24 ${
              flip ? "" : "border-y border-coral-light bg-coral-tint"
            }`}
          >
            <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={`reveal ${flip ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-card">
                  <Image
                    src={g.image}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={flip ? "lg:order-1" : ""}>
                <SectionHeading
                  eyebrow={`0${i + 1}`}
                  title={g.title}
                  body={g.body}
                />
                <ul
                  className={`reveal mt-6 grid gap-3 ${
                    g.items.length > 6 ? "sm:grid-cols-2" : ""
                  }`}
                >
                  {g.items.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                    >
                      {"emoji" in item && item.emoji ? (
                        <span
                          aria-hidden="true"
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white text-base shadow-card"
                        >
                          {item.emoji}
                        </span>
                      ) : (
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                      )}
                      <span className={"emoji" in item ? "pt-1" : ""}>
                        <span className="font-medium text-navy">
                          {item.text}
                        </span>
                        {"note" in item && item.note ? (
                          <span className="text-slate-500"> — {item.note}</span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      {/* Families */}
      <section
        id="families"
        className="section scroll-mt-24 border-y border-coral-light bg-coral-tint"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Families"
            title={ourProgram.families.title}
            body={ourProgram.families.body}
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ourProgram.families.items.map((f, i) => (
              <article
                key={f.title}
                className="card reveal p-7"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 place-items-center rounded-lg bg-coral-light text-xl"
                >
                  {f.emoji}
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="section">
        <div className="container-x">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="eyebrow">Every single day</p>
            <h2 className="h-section mt-3">{ourProgram.closing.title}</h2>
            {ourProgram.closing.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Programs by age */}
      <section
        id="ages"
        className="section scroll-mt-24 border-t border-slate-200 bg-slate-50"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Programs by age"
            title="A place for every stage"
            align="center"
          />
          <ul className="reveal mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <li key={p.name} className="card px-5 py-4">
                <p className="text-sm font-semibold text-navy">{p.name}</p>
                <p className="mt-1 text-xs text-slate-500">{p.age}</p>
              </li>
            ))}
          </ul>
          <div className="reveal mt-10 text-center">
            <Link href="/enroll" className="btn-primary">
              Start enrolling
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Come see a day at Good Beginnings"
        body="Schedule a tour to meet our teachers, see our classrooms, and learn more about our program."
      />
    </>
  );
}
