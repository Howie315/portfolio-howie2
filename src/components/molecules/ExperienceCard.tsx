import type { ExperienceEntry } from "../../data/portfolio";

import Badge from "../atoms/Badge";
import ButtonLink from "../atoms/ButtonLink";
import IconArrowUpRight from "../atoms/IconArrowUpRight";

type ExperienceCardProps = {
  entry: ExperienceEntry;
};

const ExperienceCard = ({ entry }: ExperienceCardProps): JSX.Element => {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/7 p-6 shadow-[0_20px_80px_rgba(4,10,24,0.24)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-semibold text-white">
            {entry.title}
          </h3>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
            {entry.duration}
          </p>
        </div>
        {entry.link ? (
          <ButtonLink
            className="self-start"
            href={entry.link}
            rel="noreferrer"
            target="_blank"
            variant="ghost"
          >
            <span className="flex items-center gap-2">
              View work
              <IconArrowUpRight />
            </span>
          </ButtonLink>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(16rem,0.9fr)]">
        <ul className="space-y-3 text-sm leading-7 text-slate-300">
          {entry.description.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap content-start gap-2">
          {entry.technologies.map((technology) => (
            <Badge key={technology} tone="muted">
              {technology}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
