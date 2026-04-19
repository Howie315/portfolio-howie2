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

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  summary: string;
  technologies: ReadonlyArray<string>;
  href: string;
  images: ReadonlyArray<ProjectImage>;
};

export const projects: ReadonlyArray<Project> = [
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
