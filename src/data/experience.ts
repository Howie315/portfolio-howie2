export type ExperienceEntry = {
  title: string;
  duration: string;
  description: ReadonlyArray<string>;
  technologies: ReadonlyArray<string>;
  link?: string;
};

export const experienceEntries: ReadonlyArray<ExperienceEntry> = [
  {
    title: "Front End Software Engineer - Synchrony Financial",
    duration: "July 2024 - Present",
    description: [
      "Developed an address validation modal for a new account opening micro-frontend, improving address accuracy by nearly 90%.",
      "Led the design system upgrade from Tailwind CSS v3 to v4, resolving breaking changes and modernizing the styling architecture with CSS modules.",
      "Engineered a reusable agentic workflow as a shared Nexus package, enabling cross-repo consumption through Jira and Bitbucket integrations secured with tokens.",
      "Maintained high code reliability with comprehensive Jest coverage across key features, keeping test coverage above 88%.",
      "Contributed to an internal idea platform designed to support employee collaboration, discussion, and innovation.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "CSS Modules",
      "Jest",
      "Jira API",
      "Bitbucket API",
    ],
  },
  {
    title: "Front End Engineer - Sizzle",
    duration: "July 2023 - July 2024",
    description: [
      "Engineered a Dietitian Dashboard for a SaaS-based product using React and TypeScript, translating Figma concepts into production-ready timelines and charts.",
      "Integrated Firebase Analytics to track user behavior and engagement throughout the Dietitian Dashboard experience.",
      "Improved patient tracking efficiency by 66.7% with RTK Query, reducing response time from 3 ms to 1 ms.",
      "Reduced deployment time by 25% through Vercel automation, CI/CD improvements, and better caching practices.",
      "Improved brand consistency and responsive design by refining shared color themes and typography with SCSS, cutting styling boilerplate by 18%.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Firebase Analytics",
      "RTK Query",
      "Vercel",
      "SCSS",
    ],
  },
];
