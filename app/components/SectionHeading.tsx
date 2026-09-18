export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const centered = align === "center";

  return (
    <div
      className={`reveal ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {eyebrow ? (
        <p className={light ? "eyebrow text-coral-light" : "eyebrow"}>
          {eyebrow}
        </p>
      ) : null}

      <h2 className={`h-section mt-3 ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>

      {body ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/75" : "text-slate-600"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
