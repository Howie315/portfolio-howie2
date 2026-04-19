import { experienceEntries } from "../../../data/experience";

import ExperienceCard from "./subcomponents/ExperienceCard";
import SectionHeading from "../../molecules/SectionHeading";

const ExperienceSection = (): JSX.Element => {
  return (
    <section
      className="px-4 py-8 scroll-mt-28 sm:px-6 lg:px-8"
      id="experience"
      style={{
        containIntrinsicSize: "1px 1080px",
        contentVisibility: "auto",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          description="A snapshot of the teams, responsibilities, and technologies that have shaped how I build interfaces today."
          eyebrow="Experience"
          title="Hands-on product work across web and mobile."
        />

        <div className="mt-10 grid gap-6">
          {experienceEntries.map((entry) => (
            <ExperienceCard entry={entry} key={entry.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
