import { useState } from "react";

import type { NavItem } from "../../data/portfolio";

import ButtonLink from "../atoms/ButtonLink";

type SiteHeaderProps = {
  items: NavItem[];
};

const SiteHeader = ({ items }: SiteHeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = (): void => setIsOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-lg font-semibold tracking-[0.2em] text-white uppercase"
            href="#top"
          >
            Howie
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {items.map((item) => (
              <a
                key={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
            <ButtonLink href="#contact" variant="ghost">
              Let&apos;s connect
            </ButtonLink>
          </nav>

          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            <span className="text-lg">{isOpen ? "×" : "≡"}</span>
          </button>
        </div>
      </header>

      {isOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-950/92 px-6 pt-28 backdrop-blur-xl md:hidden">
          <nav aria-label="Mobile" className="grid gap-4">
            {items.map((item) => (
              <a
                key={item.href}
                className="rounded-3xl border border-white/10 bg-white/6 px-5 py-4 text-lg text-white"
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <ButtonLink className="mt-2" href="#contact" onClick={closeMenu}>
              Start a conversation
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </>
  );
};

export default SiteHeader;
