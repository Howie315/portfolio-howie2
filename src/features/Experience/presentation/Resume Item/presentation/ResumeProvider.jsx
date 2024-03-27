// ResumeContext.js
import React, { createContext, useState } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState([
    {
      title: "Front-End Engineer - SIZZLE",
      duration: "June 2023 - Present",
      description: [
        "Engineered a Dietitian Dashboard on a SaaS-based web application with React and TypeScript, featuring user-friendly timelines and charts from Figma.",
        "Enhanced dashboard responsiveness through UI state management optimization with React Redux Toolkit.",
        "Contributed to Kotlin Multi-platform by updating tracking category synchronization across iOS and Android.",
        "Created adaptive pagination for patient lists, starting with 21 entries and seamlessly loading more as users scroll.",
        "Reduced deployment time by 25% with Vercel’s automated deployments and caching, utilizing CI/CD pipelines for faster and more reliable updates.",
        "Streamlined patient tracking efficiency by 66.7% using RTK Query from 3ms to 1ms.",
        "Enhanced brand consistency and responsive design by streamlining color themes and typography with SCSS, cutting boilerplate code by 18%.",
      ],
      technologies: [
        "ReactJS",
        "SCSS",
        "Javscript",
        "Typescript",
        "Kotlin Multiplatform",
      ],
      //   link: 'https://getsizzle.app/'
    },
    {
      title: "IOS Engineer - SIZZLE",
      duration: "Sep 2022 - May 2023",
      description: [
        "Collaborated in a cross-functional team of 4 to create a versatile, cross-platform app facilitating communication between dietitians and patients for gut health and weight management.",
        "Led the UX/UI design of secure login, sign-up, and messaging interfaces using Swift.",
        " Built APIs for registration, chat, and notifications with WebSockets and MongoDB, enhancing application development",
        " Implemented MVC architecture in Swift for a well-structured UI",
        "Generated detailed weekly reports on database and software architecture for strategic insights in scrum meetings.",
      ],
      technologies: ["Swift", "Android", "MongoDB", "Kotlin Multiplatform"],
      //   link: 'https://getsizzle.app/'
    },
  ]);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
