import type { ComponentPropsWithoutRef } from "react";

type ContactFieldProps = {
  label: string;
  multiline?: boolean;
} & (ComponentPropsWithoutRef<"input"> | ComponentPropsWithoutRef<"textarea">);

const ContactField = ({
  label,
  multiline = false,
  className = "",
  ...props
}: ContactFieldProps): JSX.Element => {
  const sharedClasses =
    "w-full rounded-3xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-brand-400/60 focus:bg-slate-950/60";

  return (
    <label className="grid gap-2 text-sm text-slate-300">
      <span>{label}</span>
      {multiline ? (
        <textarea
          className={`${sharedClasses} min-h-32 resize-y ${className}`}
          {...(props as ComponentPropsWithoutRef<"textarea">)}
        />
      ) : (
        <input
          className={`${sharedClasses} ${className}`}
          {...(props as ComponentPropsWithoutRef<"input">)}
        />
      )}
    </label>
  );
};

export default ContactField;
