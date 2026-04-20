import { useState } from "react";

import { navItems } from "../../../data/site";

import { ButtonLink } from "../../atoms/ButtonLink";

export const SiteHeader = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = (): void => setIsOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[rgba(4,3,14,0.68)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-semibold tracking-[0.24em] text-white uppercase sm:text-lg"
            href="#top"
          >
            <span className="sm:hidden">Howie</span>
            <span className="hidden sm:inline">Howie Nguyen</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {navItems.map((item) => (
              <a
                className="text-sm tracking-[0.08em] text-[rgba(214,216,226,0.78)] transition hover:text-white"
                href={item.href}
                key={item.href}
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
        <div className="fixed inset-0 z-40 bg-[rgba(4,3,12,0.94)] px-6 pt-28 backdrop-blur-2xl md:hidden">
          <nav aria-label="Mobile" className="grid gap-4">
            {navItems.map((item) => (
              <a
                className="surface-panel rounded-[1.6rem] px-5 py-4 text-lg text-white"
                href={item.href}
                key={item.href}
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
