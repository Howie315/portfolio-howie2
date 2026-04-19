import { aboutHighlights, aboutParagraphs, profile } from "../../../data/site";

import SectionHeading from "../../molecules/SectionHeading";

const AboutSection = (): JSX.Element => {
  return (
    <section
      className="px-4 py-8 scroll-mt-28 sm:px-6 lg:px-8"
      id="about"
      style={{
        containIntrinsicSize: "1px 960px",
        contentVisibility: "auto",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          description="The portfolio is now structured around reusable Tailwind components, but the voice and content still reflect the same work and interests."
          eyebrow="About"
          title="Frontend craft grounded in product thinking."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]">
          <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/6 p-3 shadow-[0_24px_90px_rgba(4,10,24,0.28)] backdrop-blur-xl">
            <img
              alt={profile.alt}
              className="aspect-4/5 w-full rounded-3xl object-cover"
              src={profile.image}
            />
          </div>

          <div className="grid gap-6">
            <div className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
              <div className="space-y-4 text-base leading-8 text-slate-300">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {aboutHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-3xl border border-white/10 bg-slate-950/45 p-5"
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
