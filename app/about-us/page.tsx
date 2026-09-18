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

const STAT_BG = ["bg-sunshine", "bg-jade", "bg-bubblegum", "bg-coral"];
const AVATAR_BG = [
  "bg-tomato text-white",
  "bg-sunshine text-ink",
  "bg-jade text-white",
  "bg-bubblegum text-ink",
  "bg-berry text-white",
  "bg-coral text-ink",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A trusted part of the community since 1999"
        body="We welcome children from 6 months through 5 years, providing a safe, caring, and engaging place to learn, grow, and explore."
        underline="since 1999"
      />

      {/* Story + stats */}
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="reveal space-y-5">
            {about.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-base leading-relaxed text-ink/70"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="reveal">
            <div
              className="rotate-1 overflow-hidden rounded-block-lg border-[3px] border-ink bg-white p-2.5"
              style={{ boxShadow: "10px 10px 0 0 #2A2140" }}
            >
              <Image
                src="/images/classroom-hands.jpg"
                alt="Children raising their hands during class at Good Beginnings"
                width={1200}
                height={800}
                className="h-full w-full rounded-[0.9rem] object-cover"
              />
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4">
              {about.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`rounded-block border-[3px] border-ink px-5 py-4 text-center shadow-pop-sm ${STAT_BG[i % 4]}`}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-black text-ink">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs font-bold text-ink/70">
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
      <section className="section border-y-[3px] border-ink bg-sand">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our classrooms"
            title="Four rooms, each built for a stage of growth"
            body="Every classroom is thoughtfully designed to meet its age group's developmental stage and prepare children for kindergarten with confidence and joy."
            align="center"
            underline="stage of growth"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {classrooms.map((c, i) => (
              <article
                key={c.name}
                className={`block-card block-card-hover reveal overflow-hidden ${
                  i % 2 === 1 ? "lg:mt-8" : ""
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`block-cap ${c.swatch}`} />
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-2 inline-flex rounded-lg border-[3px] border-ink bg-cream px-2.5 py-0.5 text-xs font-extrabold text-ink">
                    {c.age}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {c.detail}
                  </p>
                </div>
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
            underline="every day"
          />

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((name, i) => (
              <li
                key={name}
                className="block-card block-card-hover reveal flex items-center gap-4 p-5"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <span
                  className={`grid h-13 w-13 shrink-0 place-items-center rounded-block border-[3px] border-ink p-3 font-display text-base font-black ${AVATAR_BG[i % 6]}`}
                >
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-ink">
                    {name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-ink/55">
                    <HeartIcon className="h-3.5 w-3.5 text-tomato" />
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
