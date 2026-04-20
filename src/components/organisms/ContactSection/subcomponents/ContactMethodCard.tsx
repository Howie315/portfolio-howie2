import type { ContactMethod } from "../../../../data/site";

import { IconArrowUpRight } from "../../../atoms/IconArrowUpRight";

type ContactMethodCardProps = {
  method: ContactMethod;
};

const ContactMethodCard = ({
  method,
}: ContactMethodCardProps): React.JSX.Element => {
  return (
    <a
      className="surface-panel group flex items-center justify-between gap-4 rounded-[1.7rem] px-4 py-4 transition hover:-translate-y-0.5 hover:border-[rgba(255,122,170,0.32)]"
      href={method.href}
      rel={method.href.startsWith("http") ? "noreferrer" : undefined}
      target={method.href.startsWith("http") ? "_blank" : undefined}
    >
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.24em] text-[rgba(188,187,208,0.56)]">
          {method.label}
        </p>
        <p className="mt-2 truncate text-sm font-medium text-white">
          {method.value}
        </p>
      </div>
      <span className="text-[rgba(255,170,204,0.86)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <IconArrowUpRight />
      </span>
    </a>
  );
};

export default ContactMethodCard;
