import profileImage from "../imgs/profile.JPG";

import calendarImage from "../imgs/GymBois/calendar.png";
import homeScreenImage from "../imgs/GymBois/home-screen.png";
import loginScreenImage from "../imgs/GymBois/login-screen.png";
import timerImage from "../imgs/GymBois/timer.png";
import chatLobbyImage from "../imgs/chatLobby.svg";
import chatLoginImage from "../imgs/chatLogin.png";
import chatMessageImage from "../imgs/chatMessage.svg";
import registerImage from "../imgs/register.svg";
import homePageImage from "../imgs/SizzleMessenging/home-page.png";
import messagingImage from "../imgs/SizzleMessenging/messenging.png";
import patientInfoImage from "../imgs/SizzleMessenging/patient-info.png";
import sizzleLoginImage from "../imgs/SizzleMessenging/sizzle-login.png";

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

export type ExperienceEntry = {
  title: string;
  duration: string;
  description: string[];
  technologies: string[];
  link?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  summary: string;
  technologies: string[];
  href: string;
  images: ProjectImage[];
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const heroStats: Stat[] = [
  { label: "Years building interfaces", value: "3+" },
  { label: "Products shipped", value: "10+" },
  { label: "Primary stack", value: "React + TypeScript" },
];

export const aboutParagraphs = [
  "I'm a software engineer based in Riverside, California, with roots in Cincinnati, Ohio and a strong focus on polished product experiences.",
  "My work sits at the intersection of frontend engineering, product thinking, and design systems. I like building interfaces that feel clear, fast, and memorable.",
  "Outside of work, I spend time lifting, playing racket sports, reading manga, and keeping up with the craft side of interface design.",
];

export const aboutHighlights = [
  "Design-system minded implementation",
  "Accessible, responsive interface patterns",
  "Collaboration across design and engineering",
];

export const contactMethods: ContactMethod[] = [
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
  image: profileImage,
  alt: "Portrait of Howie Nguyen",
};

export const experienceEntries: ExperienceEntry[] = [
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

export const projects: Project[] = [
  {
    title: "Real-time Chat Application",
    summary:
      "A modular chat product with real-time messaging, reactions, emoji support, and maintainable database access patterns.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "CSS",
      "Heroku",
      "Netlify",
    ],
    href: "https://github.com/boney171/Messenger-Chat-App",
    images: [
      { src: chatLoginImage, alt: "Chat application login screen" },
      { src: registerImage, alt: "Chat application registration screen" },
      { src: chatMessageImage, alt: "Chat application conversation UI" },
      { src: chatLobbyImage, alt: "Chat application lobby UI" },
    ],
  },
  {
    title: "JymBois Fitness App",
    summary:
      "A fitness tracker mobile app focused on workout planning, logs, timers, and a responsive mobile-first experience.",
    technologies: [
      "React Native",
      "Firebase",
      "JavaScript",
      "Expo",
      "Mobile-first Design",
    ],
    href: "https://github.com/CS180-spring/cs180-22-jymbois",
    images: [
      { src: loginScreenImage, alt: "JymBois login screen" },
      { src: homeScreenImage, alt: "JymBois home screen" },
      { src: timerImage, alt: "JymBois timer screen" },
      { src: calendarImage, alt: "JymBois calendar screen" },
    ],
  },
  {
    title: "Sizzle Messaging App",
    summary:
      "A cross-platform messaging experience for dietitians and patients, designed to support secure communication and care workflows.",
    technologies: [
      "React",
      "MongoDB",
      "Kotlin Multiplatform",
      "Swift",
      "Android",
    ],
    href: "https://github.com/Howie315/Sizzle-Messaging",
    images: [
      { src: sizzleLoginImage, alt: "Sizzle login screen" },
      { src: homePageImage, alt: "Sizzle home page" },
      { src: patientInfoImage, alt: "Sizzle patient info screen" },
      { src: messagingImage, alt: "Sizzle messaging screen" },
    ],
  },
];
