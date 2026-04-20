import { heroSignals, heroStats, profile } from "../../../data/site";

import { Badge } from "../../atoms/Badge";
import { ButtonLink } from "../../atoms/ButtonLink";
import StatCard from "./subcomponents/StatCard";

const HeroSection = (): React.JSX.Element => {
  return (
    <section
      className="section-shell relative overflow-hidden pt-32 pb-14 sm:pt-36 lg:pt-40 lg:pb-20"
      id="top"
    >
      <div className="section-inner grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-center">
        <div className="relative space-y-8">
          <div className="space-y-5">
            <Badge tone="accent">
              Available for frontend and product UI work
            </Badge>

            <div className="space-y-6">
              <h1 className="max-w-4xl font-display text-[clamp(2.65rem,9vw,4.1rem)] font-semibold leading-[0.98] tracking-[-0.07em] text-white sm:text-6xl sm:leading-[0.95] lg:text-[5.7rem] lg:leading-[0.92]">
                Original digital experiences with cinematic presence and product
                discipline.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[rgba(216,218,226,0.82)] sm:text-lg">
                I&apos;m Howie Nguyen, a frontend engineer building interfaces
                that feel sharp, immersive, and deeply intentional. My focus is
                the space where product clarity, interaction design, and modern
                frontend systems meet.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#projects">View projects</ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Start a conversation
            </ButtonLink>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {heroStats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="surface-panel grid gap-4 rounded-[2rem] p-6 md:grid-cols-3">
            {heroSignals.map((signal) => (
              <div
                className="rounded-[1.4rem] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4"
                key={signal.title}
              >
                <p className="text-sm font-semibold leading-6 text-white">
                  {signal.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[rgba(212,214,224,0.72)]">
                  {signal.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2.8rem] bg-[radial-gradient(circle_at_50%_20%,rgba(126,76,255,0.26),transparent_42%),radial-gradient(circle_at_78%_28%,rgba(255,74,138,0.18),transparent_28%)] blur-3xl" />
          <div className="surface-panel relative overflow-hidden rounded-[2.8rem] p-4 shadow-[0_40px_120px_rgba(5,0,18,0.5)]">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.42),transparent)]" />
            <img
              alt={profile.alt}
              className="aspect-4/5 w-full rounded-[2.2rem] object-cover"
              src={profile.image}
            />

            <div className="absolute top-8 right-8 hidden max-w-[14rem] rounded-[1.5rem] border border-white/10 bg-[rgba(7,4,18,0.72)] px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:block">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[rgba(255,196,221,0.82)]">
                Current field
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                Frontend systems, design-system evolution, and high-trust user
                flows.
              </p>
            </div>

            <div className="absolute right-6 bottom-6 left-6 hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,5,20,0.82),rgba(4,4,13,0.9))] p-5 backdrop-blur-xl md:block">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[rgba(188,187,208,0.64)]">
                    Specialties
                  </p>
                  <p className="mt-2 text-base leading-7 text-[rgba(226,228,236,0.82)]">
                    React architecture, visual systems, interface motion, and
                    premium product polish.
                  </p>
                </div>
                <Badge className="shrink-0" tone="default">
                  Anaheim, CA
                </Badge>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:hidden">
              <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(7,4,18,0.72)] px-4 py-4 backdrop-blur-xl">
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[rgba(255,196,221,0.82)]">
                  Current field
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Frontend systems, design-system evolution, and high-trust user
                  flows.
                </p>
              </div>

              <div className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,5,20,0.82),rgba(4,4,13,0.9))] p-5 backdrop-blur-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[rgba(188,187,208,0.64)]">
                      Specialties
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[rgba(226,228,236,0.82)]">
                      React architecture, visual systems, interface motion, and
                      premium product polish.
                    </p>
                  </div>
                  <Badge className="shrink-0" tone="default">
                    Anaheim, CA
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
