import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "../components/CtaBand";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { HeartIcon } from "../components/Icons";
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
                src="/images/aboutus.jpeg"
                alt="A teacher leading circle time with preschoolers on the classroom rug"
                width={1000}
                height={750}
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

          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4">
            {staff.map((name, i) => {
              const tone = staffTones[i % staffTones.length];
              return (
                <li
                  key={name}
                  className="card card-hover reveal group relative overflow-hidden text-center transition-transform duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${(i % 4) * 70}ms` }}
                >
                  {/* Coloured band with a soft dot pattern */}
                  <div
                    aria-hidden="true"
                    className={`h-14 sm:h-20 ${tone.band} bg-[radial-gradient(rgba(255,255,255,0.7)_1.5px,transparent_1.5px)] [background-size:14px_14px]`}
                  />
                  <span
                    aria-hidden="true"
                    className={`relative mx-auto -mt-8 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${tone.avatar} text-lg sm:-mt-10 sm:h-20 sm:w-20 sm:text-xl font-semibold tracking-wide text-white shadow-card-hover ring-4 ring-white transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3`}
                  >
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="px-3 pb-5 pt-3 sm:px-5 sm:pb-6 sm:pt-4">
                    <p className="text-sm font-semibold text-navy sm:text-base">{name}</p>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 sm:text-xs">
                      <HeartIcon className={`h-3.5 w-3.5 ${tone.icon}`} />
                      Good Beginnings team
                    </p>
                  </div>
                </li>
              );
            })}
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

/** Card colours for the staff grid, echoing the classroom colours. */
const staffTones = [
  { band: "bg-coral-light", avatar: "from-coral to-coral-mid", icon: "text-coral" },
  { band: "bg-violet-100", avatar: "from-violet-500 to-fuchsia-400", icon: "text-violet-500" },
  { band: "bg-pink-100", avatar: "from-pink-500 to-rose-400", icon: "text-pink-500" },
  { band: "bg-sky-100", avatar: "from-sky-500 to-blue-500", icon: "text-sky-500" },
];
