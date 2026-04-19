import type { Stat } from "../../../../data/site";

type StatCardProps = {
  stat: Stat;
};

const StatCard = ({ stat }: StatCardProps): JSX.Element => {
  return (
    <div className="surface-panel relative overflow-hidden rounded-[1.65rem] p-5">
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)]" />
      <p className="text-[0.66rem] uppercase tracking-[0.26em] text-[rgba(188,187,208,0.62)]">
        {stat.label}
      </p>
      <p className="mt-3 font-display text-2xl font-semibold text-white">
        {stat.value}
      </p>
      {stat.detail ? (
        <p className="mt-3 max-w-xs text-sm leading-6 text-[rgba(212,214,224,0.72)]">
          {stat.detail}
        </p>
      ) : null}
    </div>
  );
};

export default StatCard;
