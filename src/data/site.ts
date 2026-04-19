import profileImage from "../imgs/profile-2026.jpg";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  detail?: string;
  label: string;
  value: string;
};

export type HeroSignal = {
  detail: string;
  title: string;
};

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
};

export const navItems: ReadonlyArray<NavItem> = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const heroStats: ReadonlyArray<Stat> = [
  {
    detail: "Shipping product UI across SaaS, internal platforms, and mobile.",
    label: "Experience arc",
    value: "3+ years",
  },
  {
    detail: "Frontend systems, interaction polish, and implementation quality.",
    label: "Core discipline",
    value: "React + TypeScript",
  },
  {
    detail: "Interfaces built to feel precise, readable, and alive.",
    label: "Delivery style",
    value: "Fast + intentional",
  },
];

export const heroSignals: ReadonlyArray<HeroSignal> = [
  {
    detail: "Turning dense product requirements into clear, high-trust flows.",
    title: "Product-minded frontend engineering",
  },
  {
    detail: "Design systems, motion, and UI architecture that scale cleanly.",
    title: "Visual craft with systems thinking",
  },
  {
    detail:
      "Balancing performance, maintainability, and memorable interaction.",
    title: "Interfaces with presence",
  },
];

export const aboutParagraphs: ReadonlyArray<string> = [
  "I build interfaces that feel controlled under pressure: clean structure, strong hierarchy, crisp feedback, and enough motion to make a product feel alive without becoming noise.",
  "Most of my work lives between frontend engineering, design systems, and product refinement. I care about the feel of a screen just as much as its implementation details.",
  "Outside of work, I recharge through lifting, racket sports, manga, and studying the craft behind memorable digital experiences.",
];

export const aboutHighlights: ReadonlyArray<string> = [
  "Design-system minded implementation",
  "Performance-aware interaction design",
  "Collaboration across design and engineering",
];

export const contactMethods: ReadonlyArray<ContactMethod> = [
  {
    label: "Email",
    value: "nguyen.howie2010@gmail.com",
    href: "mailto:nguyen.howie2010@gmail.com",
  },
  {
    label: "Phone",
    value: "+1 513 282-5266",
    href: "tel:+15132825266",
  },
  {
    label: "LinkedIn",
    value: "howie-nguyen-491587216",
    href: "https://www.linkedin.com/in/howie-nguyen-491587216/",
  },
  {
    label: "GitHub",
    value: "Howie315",
    href: "https://github.com/Howie315",
  },
];

export const profile = {
  alt: "Portrait of Howie Nguyen",
  image: profileImage,
} as const;
