import type { ContactMethod } from "../../../../data/site";

import { IconArrowUpRight } from "../../../atoms/IconArrowUpRight";

type ContactMethodCardProps = {
  method: ContactMethod;
};

const ContactMethodCard = ({ method }: ContactMethodCardProps): JSX.Element => {
  return (
    <a
      className="group flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/6 px-4 py-4 transition hover:-translate-y-0.5 hover:border-brand-400/30 hover:bg-white/10"
      href={method.href}
      rel={method.href.startsWith("http") ? "noreferrer" : undefined}
      target={method.href.startsWith("http") ? "_blank" : undefined}
    >
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
          {method.label}
        </p>
        <p className="mt-2 truncate text-sm font-medium text-white">
          {method.value}
        </p>
      </div>
      <span className="text-brand-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <IconArrowUpRight />
      </span>
    </a>
  );
};

export default ContactMethodCard;
