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
      "A dark supernatural-inspired notebook that opens the personal codex behind the tools, craft, and systems in the work.",
    id: "skills",
    kicker: "Notebook",
    summary:
      "A private codex of core strengths across React, TypeScript, frontend architecture, and product-facing platform work.",
    title: "Skills",
  },
  {
    accent: "#ff8db3",
    description:
      "A retro cartridge archive station where each experience loads like a collectible career level.",
    id: "experience",
    kicker: "Archive",
    summary:
      "Two career cartridges for recent roles focused on frontend architecture, interaction systems, and product execution.",
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
        label: "Languages + Frameworks",
        values: [
          "React",
          "TypeScript",
          "JavaScript",
          "ES6+",
          "Next.js",
          "Node.js",
          "HTML/CSS",
          "SCSS/Sass",
          "Tailwind CSS",
        ],
      },
      {
        label: "Frontend + Product UI",
        values: [
          "Responsive UI Development",
          "Component Architecture",
          "Accessibility",
          "Design Systems",
          "REST APIs",
          "AI Product Integrations",
          "Cypress",
          "Jest",
        ],
      },
      {
        label: "Developer Tools + Platforms",
        values: [
          "Git",
          "GitHub",
          "Postman",
          "Docker",
          "Linux",
          "Visual Studio Code",
          "PostgreSQL",
          "MongoDB",
          "MySQL",
        ],
      },
    ],
  },
} as const;
