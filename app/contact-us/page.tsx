import type { Metadata } from "next";
import CtaBand from "../components/CtaBand";
import PageHero from "../components/PageHero";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Good Beginnings is located at 10473 Gorman Road, Laurel, MD 20723, directly across from the Columbia Horse Center. Call 301-776-6670 to schedule a visit.",
};

export default function ContactPage() {
  const landmark =
    site.address.landmark.charAt(0).toLowerCase() +
    site.address.landmark.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Come visit our school"
        body={`${site.name} is located ${landmark}. We are fairly inconspicuous, as we strive to be a part of our community — please look for our small sign out front and our semi-circular driveway.`}
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Details */}
          <div className="reveal space-y-4">
            <ContactCard title="Phone">
              <a
                href={site.phoneHref}
                className="text-lg font-semibold text-navy transition hover:text-coral"
              >
                {site.phone}
              </a>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We ask that you make an appointment to visit, so please call
                ahead to schedule a time.
              </p>
            </ContactCard>

            <ContactCard title="Email">
              <a
                href={`mailto:${site.email}`}
                className="text-base font-medium text-navy transition hover:text-coral"
              >
                {site.email}
              </a>
            </ContactCard>

            <ContactCard title="Address">
              <address className="not-italic">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-medium text-navy transition hover:text-coral"
                >
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </a>
              </address>
              <p className="mt-2 text-sm text-slate-600">{site.address.note}</p>
            </ContactCard>

            <ContactCard title="Hours">
              <p className="text-base font-medium text-navy">
                {site.hours.weekdays}
              </p>
              <p className="mt-1 text-sm text-slate-600">{site.hours.days}</p>
            </ContactCard>
          </div>

          {/* Map + form */}
          <div className="space-y-6">
            <div className="reveal overflow-hidden rounded-xl border border-slate-200 shadow-card">
              <iframe
                title={`Map to ${site.name}`}
                src="https://www.google.com/maps?q=10473%20Gorman%20Road%2C%20Laurel%2C%20MD%2020723&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[20rem] w-full border-0"
              />
            </div>

            <form
              action={`mailto:${site.email}`}
              method="post"
              encType="text/plain"
              className="reveal rounded-xl border border-slate-200 bg-white p-7 shadow-card sm:p-8"
            >
              <h2 className="text-lg font-semibold text-navy">Email us</h2>
              <p className="mt-1.5 text-sm text-slate-600">
                Send a note and we will get back to you as soon as we can.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" required />
                <Field label="Phone" name="phone" type="tel" />
                <div className="sm:col-span-2">
                  <Field label="Email" name="email" type="email" required />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="label">
                  Message <span className="text-coral">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="field mt-1.5 resize-y"
                  placeholder="How can we help?"
                />
              </div>

              <button type="submit" className="btn-primary mt-6 w-full">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      <CtaBand
        title="We look forward to meeting you"
        body="Call ahead or email to schedule a time, and we'll show you around."
      />
    </>
  );
}

function ContactCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6">
      <p className="eyebrow">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
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
