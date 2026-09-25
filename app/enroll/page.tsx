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

export default function EnrollPage() {
  return (
    <>
      <PageHero
        eyebrow="Enroll"
        title="To enroll at Good Beginnings"
        body={`Please complete the Initial Interest Form, call ${site.phone}, or email ${site.email} to contact us, schedule a tour, and reserve your spot.`}
      />

      {/* Steps */}
      <section className="section">
        <div className="container-x">
          <ol className="grid gap-6 md:grid-cols-3">
            {enrollSteps.map((s, i) => (
              <li
                key={s.step}
                className="card reveal p-7"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-coral text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h2 className="mt-4 text-base font-semibold text-navy">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Interest form */}
      <section className="section border-y border-coral-light bg-coral-tint">
        <div className="container-x grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Initial interest form"
              title="Tell us about your family"
              body="Send us a few details and we will get back to you about openings, tours, and next steps."
            />

            <div className="reveal mt-8 overflow-hidden rounded-xl shadow-card">
              <Image
                src="/images/classroom-room.jpg"
                alt="A bright, welcoming classroom at Good Beginnings"
                width={900}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="reveal mt-6 rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-navy">Hours</h3>
              <p className="mt-2 text-sm text-slate-600">
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
              className="rounded-xl border border-slate-200 bg-white p-7 shadow-card sm:p-8"
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
                <select id="program" name="program" className="field mt-1.5">
                  <option>Infant (6 weeks – 18 months)</option>
                  <option>Toddlers (18 – 36 months)</option>
                  <option>Preschool (3 – 5 years)</option>
                  <option>Kindergarten</option>
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
                  className="field mt-1.5 resize-y"
                  placeholder="Preferred start date, tour availability, questions…"
                />
              </div>

              <button type="submit" className="btn-primary mt-6 w-full">
                Send my interest form
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                Prefer to talk? Call{" "}
                <a href={site.phoneHref} className="font-medium text-coral underline">
                  {site.phone}
                </a>{" "}
                or email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-coral underline"
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
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {classrooms.map((c, i) => (
              <li
                key={c.name}
                className="card card-hover reveal p-6"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <h3 className="text-sm font-semibold text-navy">{c.name}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  {c.age}
                </p>
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
        {required ? <span className="text-coral"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="field mt-1.5"
      />
    </div>
  );
}
