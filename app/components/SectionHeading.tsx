import { Squiggle } from "./Decor";

export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  light = false,
  underline,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  light?: boolean;
  /** Word within `title` to mark with a hand-drawn squiggle. */
  underline?: string;
}) {
  const centered = align === "center";

  // Split the title so one word can carry the squiggle.
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
    <div
      className={`reveal ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

      <h2
        className={`h-section mt-6 ${light ? "text-white" : "text-ink"}`}
      >
        {before}
        {mark ? (
          <span className="relative inline-block whitespace-nowrap">
            {mark}
            <Squiggle
              className={`absolute -bottom-2 left-0 h-3 w-full ${
                light ? "text-sunshine" : "text-tomato"
              }`}
            />
          </span>
        ) : null}
        {after}
      </h2>

      {body ? (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/80" : "text-ink/70"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
