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
        underline="visit"
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Details */}
          <div className="reveal space-y-5">
            <ContactCard title="Phone" cap="bg-tomato">
              <a
                href={site.phoneHref}
                className="font-display text-2xl font-black text-ink transition hover:text-berry"
              >
                {site.phone}
              </a>
              <p className="mt-2 text-sm text-ink/65">
                We ask that you make an appointment to visit, so please call
                ahead to schedule a time.
              </p>
            </ContactCard>

            <ContactCard title="Email" cap="bg-sunshine">
              <a
                href={`mailto:${site.email}`}
                className="font-display text-lg font-bold text-ink underline decoration-sunshine decoration-[3px] underline-offset-4 transition hover:text-berry sm:text-xl"
              >
                {site.email}
              </a>
            </ContactCard>

            <ContactCard title="Address" cap="bg-jade">
              <address className="not-italic">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-lg font-bold text-ink transition hover:text-berry"
                >
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </a>
              </address>
              <p className="mt-2 text-sm text-ink/65">{site.address.note}</p>
            </ContactCard>

            <ContactCard title="Hours" cap="bg-bubblegum">
              <p className="font-display text-lg font-bold text-ink">
                {site.hours.weekdays}
              </p>
              <p className="mt-1 text-sm text-ink/65">{site.hours.days}</p>
            </ContactCard>
          </div>

          {/* Map + form */}
          <div className="space-y-8">
            <div
              className="reveal overflow-hidden rounded-block-lg border-[3px] border-ink bg-white p-2.5"
              style={{ boxShadow: "10px 10px 0 0 #2A2140" }}
            >
              <iframe
                title={`Map to ${site.name}`}
                src="https://www.google.com/maps?q=10473%20Gorman%20Road%2C%20Laurel%2C%20MD%2020723&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full rounded-[0.9rem] border-0"
              />
            </div>

            <form
              action={`mailto:${site.email}`}
              method="post"
              encType="text/plain"
              className="reveal rounded-block-lg border-[3px] border-ink bg-white p-7 sm:p-9"
              style={{ boxShadow: "10px 10px 0 0 #2A2140" }}
            >
              <h2 className="font-display text-2xl font-black text-ink">
                Email us
              </h2>
              <p className="mt-2 text-sm text-ink/65">
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
                  Message <span className="text-tomato">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="field mt-2 resize-y"
                  placeholder="How can we help?"
                />
              </div>

              <button type="submit" className="btn-primary mt-7 w-full">
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
  cap,
  children,
}: {
  title: string;
  cap: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block-card block-card-hover overflow-hidden">
      <div className={`block-cap ${cap}`} />
      <div className="p-6">
        <span className="inline-flex rounded-lg border-[3px] border-ink bg-cream px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider text-ink">
          {title}
        </span>
        <div className="mt-4">{children}</div>
      </div>
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
