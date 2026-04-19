import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "solid" | "ghost";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "border border-[rgba(255,122,170,0.34)] bg-[linear-gradient(135deg,rgba(255,74,138,0.94),rgba(126,76,255,0.94))] text-white shadow-[0_20px_60px_rgba(111,52,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_28px_80px_rgba(111,52,255,0.45)]",
  ghost:
    "border border-white/12 bg-white/6 text-white hover:-translate-y-0.5 hover:border-[rgba(255,122,170,0.32)] hover:bg-white/10",
};

export const ButtonLink = ({
  children,
  className = "",
  variant = "solid",
  ...props
}: ButtonLinkProps): JSX.Element => {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium tracking-[0.08em] transition duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

export default ButtonLink;
