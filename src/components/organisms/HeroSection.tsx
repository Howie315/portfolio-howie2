import { heroStats, profile } from "../../data/site";

import Badge from "../atoms/Badge";
import ButtonLink from "../atoms/ButtonLink";
import StatCard from "../molecules/StatCard";

const HeroSection = (): JSX.Element => {
  return (
    <section
      className="relative overflow-hidden px-4 pt-28 pb-8 sm:px-6 lg:px-8"
      id="top"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-center">
        <div className="space-y-8">
          <Badge tone="accent">
            Available for product-focused frontend work
          </Badge>

          <div className="space-y-5">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Building thoughtful interfaces for startups and modern product
              teams.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I&apos;m Howie Nguyen, a frontend engineer focused on shaping UI
              systems that feel calm, fast, and unmistakably intentional.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#projects">View projects</ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-brand-400/20 via-transparent to-mint-300/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_30px_100px_rgba(4,10,24,0.38)] backdrop-blur-xl">
            <img
              alt={profile.alt}
              className="aspect-4/5 w-full rounded-4xl object-cover"
              src={profile.image}
            />
            <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Focus
              </p>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Design systems, polished interfaces, frontend architecture, and
                close collaboration with product and design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
