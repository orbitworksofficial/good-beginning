export default function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-coral-light bg-coral-tint">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-coral/10 blur-3xl"
      />
      <div className="container-x relative py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-h1 font-semibold text-navy lg:text-h1-lg">
            {title}
          </h1>
          {body ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {body}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
