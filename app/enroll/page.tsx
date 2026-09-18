import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "../components/CtaBand";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { CheckIcon } from "../components/Icons";
import { classrooms, enrollSteps, site } from "../lib/site";

export const metadata: Metadata = {
  title: "Enroll",
  description:
    "Enroll at Good Beginnings in Laurel, MD. Complete the Initial Interest Form, schedule a tour, and reserve your child's spot. Call 301-776-6670.",
};

const STEP_CAP = ["bg-tomato", "bg-sunshine", "bg-jade"];
const STEP_BADGE = [
  "bg-tomato text-white",
  "bg-sunshine text-ink",
  "bg-jade text-white",
];

export default function EnrollPage() {
  return (
    <>
      <PageHero
        eyebrow="Enroll"
        title="To enroll at Good Beginnings"
        body={`Please complete the Initial Interest Form, call ${site.phone}, or email ${site.email} to contact us, schedule a tour, and reserve your spot.`}
        underline="Good Beginnings"
      />

      {/* Steps */}
      <section className="section">
        <div className="container-x">
          <ol className="grid gap-7 md:grid-cols-3">
            {enrollSteps.map((s, i) => (
              <li
                key={s.step}
                className={`block-card block-card-hover reveal overflow-hidden ${
                  i === 1 ? "md:mt-8" : ""
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`block-cap ${STEP_CAP[i]}`} />
                <div className="p-8">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-block border-[3px] border-ink font-display text-lg font-black ${STEP_BADGE[i]}`}
                  >
                    {i + 1}
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Interest form */}
      <section className="section border-y-[3px] border-ink bg-sand">
        <div className="container-x grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Initial interest form"
              title="Tell us about your family"
              body="Send us a few details and we will get back to you about openings, tours, and next steps."
              underline="your family"
            />

            <div
              className="reveal mt-10 -rotate-1 overflow-hidden rounded-block-lg border-[3px] border-ink bg-white p-2.5"
              style={{ boxShadow: "8px 8px 0 0 #2A2140" }}
            >
              <Image
                src="/images/classroom-room.jpg"
                alt="A bright, welcoming classroom at Good Beginnings"
                width={900}
                height={600}
                className="h-full w-full rounded-[0.9rem] object-cover"
              />
            </div>

            <div className="reveal mt-8 rounded-block border-[3px] border-ink bg-sunshine p-6 shadow-pop-sm">
              <h3 className="font-display text-lg font-bold text-ink">Hours</h3>
              <p className="mt-2 text-sm font-semibold text-ink/75">
                {site.hours.days}
                <br />
                {site.hours.weekdays}
              </p>
            </div>
          </div>

          <div className="reveal">
            <form
              action={`mailto:${site.email}`}
              method="post"
              encType="text/plain"
              className="rounded-block-lg border-[3px] border-ink bg-white p-7 sm:p-9"
              style={{ boxShadow: "10px 10px 0 0 #2A2140" }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Parent / guardian name" name="parentName" required />
                <Field label="Phone" name="phone" type="tel" required />
                <div className="sm:col-span-2">
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field label="Child's name" name="childName" />
                <Field label="Child's date of birth" name="dob" type="date" />
              </div>

              <div className="mt-5">
                <label htmlFor="program" className="label">
                  Program of interest
                </label>
                <select id="program" name="program" className="field mt-2">
                  <option>Infant (6 weeks – 18 months)</option>
                  <option>Toddlers (18 – 36 months)</option>
                  <option>Preschool (3 – 5 years)</option>
                  <option>Kindergarten</option>
                  <option>Before &amp; After School</option>
                  <option>Summer Program</option>
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="label">
                  Anything you'd like us to know?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="field mt-2 resize-y"
                  placeholder="Preferred start date, tour availability, questions…"
                />
              </div>

              <button type="submit" className="btn-primary mt-7 w-full">
                Send my interest form
              </button>

              <p className="mt-5 text-center text-xs leading-relaxed text-ink/60">
                Prefer to talk? Call{" "}
                <a href={site.phoneHref} className="font-bold text-berry underline">
                  {site.phone}
                </a>{" "}
                or email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-bold text-berry underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Classrooms recap */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our classrooms"
            title="Where your child would spend their day"
            align="center"
            underline="their day"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {classrooms.map((c, i) => (
              <li
                key={c.name}
                className={`block-card block-card-hover reveal overflow-hidden ${
                  i % 2 === 1 ? "lg:mt-6" : ""
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`block-cap ${c.swatch}`} />
                <div className="p-6">
                  <h3 className="font-display text-base font-bold text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-ink/70">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                    {c.age}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Still have questions? Contact us anytime"
        body="We look forward to hearing from you and showing you around our school."
      />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
        {required ? <span className="text-tomato"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="field mt-2"
      />
    </div>
  );
}
