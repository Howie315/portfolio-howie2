import { SectionEyebrow } from "../atoms/SectionEyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps): JSX.Element => {
  const alignmentClasses =
    align === "center"
      ? "mx-auto max-w-3xl text-center items-center"
      : "max-w-3xl text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignmentClasses}`}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="max-w-4xl font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="max-w-3xl text-base leading-8 text-[rgba(210,212,224,0.82)] sm:text-lg">
        {description}
      </p>
    </div>
  );
};

export default SectionHeading;
