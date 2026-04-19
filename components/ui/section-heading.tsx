interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  copy: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.32em] text-blue-200/70">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="section-title">{title}</h2>
      <p className="section-copy mt-4">{copy}</p>
    </div>
  );
}
