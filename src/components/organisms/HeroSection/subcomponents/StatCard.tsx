import type { Stat } from "../../../../data/site";

type StatCardProps = {
  stat: Stat;
};

const StatCard = ({ stat }: StatCardProps): JSX.Element => {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
        {stat.label}
      </p>
      <p className="mt-3 font-display text-2xl font-semibold text-white">
        {stat.value}
      </p>
    </div>
  );
};

export default StatCard;
