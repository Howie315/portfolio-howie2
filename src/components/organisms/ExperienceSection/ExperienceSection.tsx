import { experienceEntries } from "../../../data/experience";

import ExperienceCard from "./subcomponents/ExperienceCard";
import SectionHeading from "../../molecules/SectionHeading";

const ExperienceSection = (): JSX.Element => {
  return (
    <section
      className="section-shell"
      id="experience"
      style={{
        containIntrinsicSize: "1px 1080px",
        contentVisibility: "auto",
      }}
    >
      <div className="section-inner">
        <SectionHeading
          description="A focused look at the environments, systems, and responsibilities that shaped how I approach interface quality today."
          eyebrow="Experience"
          title="Product work shaped across web platforms and modern frontend systems."
        />

        <div className="mt-12 grid gap-6">
          {experienceEntries.map((entry) => (
            <ExperienceCard entry={entry} key={entry.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
