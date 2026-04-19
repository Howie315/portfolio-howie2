export type ExperienceEntry = {
  title: string;
  duration: string;
  description: ReadonlyArray<string>;
  technologies: ReadonlyArray<string>;
  link?: string;
};

export const experienceEntries: ReadonlyArray<ExperienceEntry> = [
  {
    title: "Front-End Engineer - Sizzle",
    duration: "June 2023 - Present",
    description: [
      "Engineered a Dietitian Dashboard for a SaaS product using React and TypeScript, translating Figma concepts into production-ready timelines and charts.",
      "Improved dashboard responsiveness by refining UI state management with Redux Toolkit and RTK Query.",
      "Built adaptive pagination for patient lists, starting with 21 entries and loading more as users scroll.",
      "Reduced deployment time by 25% through Vercel automation, CI/CD improvements, and better caching practices.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "SCSS",
      "Redux Toolkit",
      "RTK Query",
      "Kotlin Multiplatform",
    ],
  },
  {
    title: "iOS Engineer - Sizzle",
    duration: "Sep 2022 - May 2023",
    description: [
      "Collaborated in a four-person team to build a cross-platform messaging product for dietitians and patients.",
      "Led UX and UI work for secure login, sign-up, and messaging flows using Swift.",
      "Built APIs for registration, chat, and notifications with WebSockets and MongoDB-backed services.",
      "Documented software and database architecture weekly to support planning and sprint execution.",
    ],
    technologies: ["Swift", "MongoDB", "WebSockets", "Kotlin Multiplatform"],
  },
];
