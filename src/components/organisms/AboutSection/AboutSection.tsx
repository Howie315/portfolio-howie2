import { aboutHighlights, aboutParagraphs } from "../../../data/site";

import SectionReveal from "../../molecules/SectionReveal";
import SectionHeading from "../../molecules/SectionHeading";

const AboutSection = (): React.JSX.Element => {
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
        <SectionReveal>
          <SectionHeading
            description="The work is grounded in product delivery, but the standard I chase is a little higher than just functional. I want the interface to hold attention, communicate confidence, and make the product feel unmistakably considered."
            eyebrow="About"
            title="Frontend craft with structure, tension, and visual control."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)]">
            <div className="surface-panel relative overflow-hidden rounded-[2.4rem] p-6 sm:p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,138,0.16),transparent_26%),radial-gradient(circle_at_75%_32%,rgba(126,76,255,0.18),transparent_28%),linear-gradient(180deg,rgba(8,6,18,0.2),rgba(8,6,18,0.74))]" />
              <div className="absolute top-8 left-8 h-40 w-40 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_62%)]" />
              <div className="absolute top-12 left-12 h-32 w-32 rounded-full border border-[rgba(255,170,204,0.24)]" />
              <div className="absolute top-[4.5rem] left-[4.5rem] h-20 w-20 rounded-full border border-[rgba(126,76,255,0.28)]" />
              <div className="absolute top-10 right-10 h-px w-24 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)]" />
              <div className="absolute right-8 bottom-8 h-28 w-28 rotate-12 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />

              <div className="relative flex min-h-[26rem] flex-col justify-between">
                <div className="max-w-[16rem]">
                  <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[rgba(255,170,204,0.82)]">
                    Identity field
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                    Calm systems.
                    <br />
                    Sharp execution.
                  </h3>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 backdrop-blur-xl">
                      <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[rgba(188,187,208,0.64)]">
                        Base
                      </p>
                      <p className="mt-2 text-base font-medium text-white">
                        Anaheim, California
                      </p>
                    </div>

                    <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 backdrop-blur-xl">
                      <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[rgba(188,187,208,0.64)]">
                        Energy
                      </p>
                      <p className="mt-2 text-base font-medium text-white">
                        Product UI + interaction feel
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.85rem] border border-white/10 bg-[rgba(7,4,18,0.68)] p-5 backdrop-blur-xl">
                    <p className="text-sm leading-7 text-[rgba(220,222,231,0.82)]">
                      I like interfaces that feel precise under pressure: strong
                      hierarchy, memorable motion, and systems that still stay
                      clean when the product gets complicated.
                    </p>
                  </div>
                </div>
              </div>
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
        </SectionReveal>
      </div>
    </section>
  );
};

export default AboutSection;
