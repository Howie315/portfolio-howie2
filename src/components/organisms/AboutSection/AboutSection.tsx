import { aboutHighlights, aboutParagraphs, profile } from "../../../data/site";

import SectionHeading from "../../molecules/SectionHeading";

const AboutSection = (): JSX.Element => {
  return (
    <section
      className="section-shell"
      id="about"
      style={{
        containIntrinsicSize: "1px 960px",
        contentVisibility: "auto",
      }}
    >
      <div className="section-inner">
        <SectionHeading
          description="The work is grounded in product delivery, but the standard I chase is a little higher than just functional. I want the interface to hold attention, communicate confidence, and make the product feel unmistakably considered."
          eyebrow="About"
          title="Frontend craft with structure, tension, and visual control."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)]">
          <div className="surface-panel overflow-hidden rounded-[2.4rem] p-3">
            <img
              alt={profile.alt}
              className="aspect-4/5 w-full rounded-4xl object-cover"
              src={profile.image}
            />
          </div>

          <div className="grid gap-6">
            <div className="surface-panel rounded-[2.2rem] p-6 sm:p-8">
              <div className="space-y-5 text-base leading-8 text-[rgba(214,216,226,0.82)]">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {aboutHighlights.map((highlight) => (
                <div
                  className="surface-panel rounded-[1.7rem] p-5"
                  key={highlight}
                >
                  <p className="text-sm font-medium leading-7 text-white">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
