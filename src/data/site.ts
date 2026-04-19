import profileImage from "../imgs/profile.JPG";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  label: string;
  value: string;
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
  { label: "Years building interfaces", value: "3+" },
  { label: "Products shipped", value: "10+" },
  { label: "Primary stack", value: "React + TypeScript" },
];

export const aboutParagraphs: ReadonlyArray<string> = [
  "I'm a software engineer based in Riverside, California, with roots in Cincinnati, Ohio and a strong focus on polished product experiences.",
  "My work sits at the intersection of frontend engineering, product thinking, and design systems. I like building interfaces that feel clear, fast, and memorable.",
  "Outside of work, I spend time lifting, playing racket sports, reading manga, and keeping up with the craft side of interface design.",
];

export const aboutHighlights: ReadonlyArray<string> = [
  "Design-system minded implementation",
  "Accessible, responsive interface patterns",
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
