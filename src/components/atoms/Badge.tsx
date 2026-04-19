import type { ReactNode } from "react";

type BadgeTone = "default" | "accent" | "muted";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  default: "border-white/12 bg-white/8 text-slate-100",
  accent: "border-brand-400/30 bg-brand-400/12 text-brand-300",
  muted: "border-white/10 bg-slate-950/45 text-slate-300",
};

const Badge = ({
  children,
  className = "",
  tone = "default",
}: BadgeProps): JSX.Element => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
