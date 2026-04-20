import { experienceEntries } from "./experience";
import { projects } from "./projects";
import { aboutHighlights, aboutParagraphs, contactMethods } from "./site";

export const sceneSectionOrder = [
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
] as const;

export type SceneSectionId = (typeof sceneSectionOrder)[number];

export type SceneSection = {
  accent: string;
  description: string;
  id: SceneSectionId;
  kicker: string;
  summary?: string;
  title: string;
};

const skillSet = new Set<string>();

experienceEntries.forEach((entry) => {
  entry.technologies.forEach((technology) => {
    skillSet.add(technology);
  });
});

projects.forEach((project) => {
  project.technologies.forEach((technology) => {
    skillSet.add(technology);
  });
});

export const sceneSections: ReadonlyArray<SceneSection> = [
  {
    accent: "#ff4a8a",
    description:
      "A desk-like command surface that anchors the personal side of the portfolio: how I think, what I value, and why the interface matters as much as the implementation.",
    id: "about",
    kicker: "Desk",
    summary:
      "Frontend engineer with a product mindset and a strong bias toward memorable interaction quality.",
    title: "About",
  },
  {
    accent: "#6dcbff",
    description:
      "A floating monitor that opens recent product work, prototype systems, and the kinds of interfaces I like building most.",
    id: "projects",
    kicker: "Monitor",
    summary:
      "Selected projects across messaging, fitness, SaaS, and interaction-heavy products.",
    title: "Projects",
  },
  {
    accent: "#d2b1ff",
    description:
      "An archive of tools, languages, and systems thinking collected from shipping products across web and mobile teams.",
    id: "skills",
    kicker: "Archive",
    summary:
      "A working stack centered on React, TypeScript, product systems, and modern frontend craft.",
    title: "Skills",
  },
  {
    accent: "#ff8db3",
    description:
      "A suspended wall panel for the work history behind the craft, from Sizzle to Synchrony Financial.",
    id: "experience",
    kicker: "Wall Panel",
    summary:
      "Recent roles focused on frontend architecture, interaction systems, and product execution.",
    title: "Experience",
  },
  {
    accent: "#7e4cff",
    description:
      "A portal-like threshold for getting in touch when you want to build something sharp, ambitious, and user-facing.",
    id: "contact",
    kicker: "Portal",
    summary:
      "Open to frontend roles, product UI work, and distinctive web experiences.",
    title: "Contact",
  },
] as const;

export const sceneSectionCopy = {
  about: {
    highlights: aboutHighlights,
    paragraphs: aboutParagraphs,
  },
  contact: {
    methods: contactMethods,
  },
  experience: {
    entries: experienceEntries,
  },
  projects: {
    projects,
  },
  skills: {
    groups: [
      {
        label: "Frontend + UI",
        values: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Design Systems",
          "Interaction Design",
          "Accessibility",
        ],
      },
      {
        label: "Product + Platforms",
        values: [
          "ChatGPT Apps",
          "Marketplace API",
          "MCP",
          "Nexus",
          "FSM Workflows",
          "Firebase Analytics",
        ],
      },
      {
        label: "Broader Stack",
        values: Array.from(skillSet).sort(),
      },
    ],
  },
} as const;
