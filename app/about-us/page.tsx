import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "../components/CtaBand";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { about, classrooms, staff } from "../lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Good Beginnings has been a trusted part of the Laurel, MD community since 1999, welcoming children from 6 months through 5 years into four thoughtfully designed classrooms.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={about.heading}
        body="We welcome children from 6 months through 5 years, providing a safe, caring, and engaging place to learn, grow, and explore."
      />

      {/* Story + stats */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="reveal space-y-4">
            {about.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-base leading-relaxed text-slate-600"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="reveal">
            <div className="overflow-hidden rounded-xl shadow-card">
              <Image
                src="/images/classroom-hands.jpg"
                alt="Children raising their hands during class at Good Beginnings"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-4">
              {about.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-xl font-semibold text-navy">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Classrooms */}
      <section className="section border-y border-coral-light bg-coral-tint">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our classrooms"
            title="Four rooms, each built for a stage of growth"
            body="Every classroom is thoughtfully designed to meet its age group's developmental stage and prepare children for kindergarten with confidence and joy."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {classrooms.map((c, i) => (
              <article
                key={c.name}
                className="card card-hover reveal p-6"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <h3 className="text-base font-semibold text-navy">{c.name}</h3>
                <p className="mt-1.5 text-sm font-medium text-coral">{c.age}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {c.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our staff"
            title="The people your child will see every day"
            body="Our directors and teachers share a true passion for nurturing children and creating a supportive environment where families feel at home."
            align="center"
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((name, i) => (
              <li
                key={name}
                className="card card-hover reveal flex items-center gap-4 p-5"
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral-light text-sm font-semibold text-coral">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy">
                    {name}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Good Beginnings team
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Come see our classrooms for yourself"
        body="We ask that you make an appointment to visit, so please call ahead or email to schedule a time."
      />
    </>
  );
}
