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
      "Architected a custom ChatGPT app integration with the Synchrony Marketplace API, using MCP and a bespoke widget framework to generate and render interactive marketplace cards inside the application.",
      "Designed and delivered a reusable agentic orchestration framework as a shared Nexus package, enabling cross-repo adoption without MCP server dependencies.",
      "Integrated Jira and Bitbucket APIs through secure tokens and implemented an FSM-based workflow with logger and CLI subcommands to improve traceability and standardize agent execution within VS Code Chat sub-agent constraints.",
      "Contributed to an internal idea platform designed to support employee collaboration, discussion, and innovation.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "ChatGPT Apps",
      "Marketplace API",
      "MCP",
      "Nexus",
      "FSM Workflows",
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
