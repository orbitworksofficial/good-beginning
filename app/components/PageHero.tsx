import { BlockDots, RainbowArc, Squiggle } from "./Decor";

export default function PageHero({
  eyebrow,
  title,
  body,
  underline,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  underline?: string;
}) {
  let before = title;
  let mark = "";
  let after = "";
  if (underline && title.includes(underline)) {
    const i = title.indexOf(underline);
    before = title.slice(0, i);
    mark = underline;
    after = title.slice(i + underline.length);
  }

  return (
    <section className="relative overflow-hidden border-b-[3px] border-ink bg-cream">
      <div className="pointer-events-none absolute inset-0 bg-grid-blocks opacity-60" />
      {/* Hidden on small screens, where it would sit behind the headline. */}
      <RainbowArc className="pointer-events-none absolute -right-16 -top-8 hidden h-48 w-80 opacity-30 lg:block" />

      <div className="container-x relative py-16 text-center sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-display-sm font-black text-ink sm:text-[3.25rem] sm:leading-[1.03]">
          {before}
          {mark ? (
            <span className="relative inline-block whitespace-nowrap text-berry">
              {mark}
              <Squiggle className="absolute -bottom-2.5 left-0 h-3.5 w-full text-sunshine" />
            </span>
          ) : null}
          {after}
        </h1>
        {body ? (
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
            {body}
          </p>
        ) : null}
        <BlockDots className="mt-8" />
      </div>
    </section>
  );
}
