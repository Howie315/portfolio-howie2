import type { ExperienceEntry } from "../../../../data/experience";

import { Badge } from "../../../atoms/Badge";
import { ButtonLink } from "../../../atoms/ButtonLink";
import { IconArrowUpRight } from "../../../atoms/IconArrowUpRight";

type ExperienceCardProps = {
  entry: ExperienceEntry;
};

const ExperienceCard = ({ entry }: ExperienceCardProps): React.JSX.Element => {
  return (
    <article className="surface-panel rounded-[2.1rem] p-6 sm:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">
            {entry.title}
          </h3>
          <p className="text-sm uppercase tracking-[0.18em] text-[rgba(188,187,208,0.64)]">
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
        <ul className="space-y-3 text-sm leading-7 text-[rgba(214,216,226,0.78)]">
          {entry.description.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,143,196,0.94)] shadow-[0_0_16px_rgba(255,86,160,0.72)]" />
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
