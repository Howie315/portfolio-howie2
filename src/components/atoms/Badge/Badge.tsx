import type { ReactNode } from "react";

type BadgeTone = "default" | "accent" | "muted";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  default:
    "border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] text-slate-100",
  accent:
    "border-[rgba(255,74,138,0.32)] bg-[linear-gradient(135deg,rgba(255,74,138,0.14),rgba(126,76,255,0.12))] text-[rgba(255,196,221,0.95)]",
  muted:
    "border-[rgba(255,255,255,0.08)] bg-[rgba(8,4,18,0.62)] text-[rgba(225,221,244,0.84)]",
};

export const Badge = ({
  children,
  className = "",
  tone = "default",
}: BadgeProps): JSX.Element => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-medium tracking-[0.24em] uppercase ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
