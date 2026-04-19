import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "solid" | "ghost";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-brand-400 text-slate-950 shadow-[0_18px_45px_rgba(99,210,255,0.28)] hover:-translate-y-0.5 hover:bg-brand-300",
  ghost:
    "border border-white/12 bg-white/6 text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10",
};

const ButtonLink = ({
  children,
  className = "",
  variant = "solid",
  ...props
}: ButtonLinkProps): JSX.Element => {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

export default ButtonLink;
