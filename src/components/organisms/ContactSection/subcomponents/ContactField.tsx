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
}: ContactFieldProps): React.JSX.Element => {
  const sharedClasses =
    "w-full rounded-[1.5rem] border border-white/10 bg-[rgba(7,4,18,0.68)] px-4 py-3 text-sm text-white placeholder:text-[rgba(188,187,208,0.46)] outline-none transition focus:border-[rgba(255,122,170,0.42)] focus:bg-[rgba(7,4,18,0.82)]";

  return (
    <label className="grid gap-2 text-sm text-[rgba(214,216,226,0.8)]">
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
