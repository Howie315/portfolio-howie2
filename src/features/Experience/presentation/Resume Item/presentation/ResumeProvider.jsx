// ResumeContext.js
import React, { createContext, useState } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState([
    {
      title: "Front-End Engineer - SIZZLE",
      duration: "June 2023 - Present",
      description: [
        'Developed the Dietitian Dashboard using React and Typescript, streamlining clinicians" access to patient data via user-friendly timelines, detailed charts, and organized data cards',
        " Refactored the UI state management using React Redux Toolkit, adhering to the Flux design pattern, which led to a reduction in dashboard load times by 20%, significantly improving user interaction responsiveness.",
        " Implemented advanced search and filtering, reducing patient data retrieval times by approximately 15 minutes perencounter, streamlining workflow for clinicians",
        "Utilized SCSS to design clear typography and select a cohesive color theme, ensuring readability and brand consistency.",
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
      duration: "Sep 2022 - May",
      description: [
        "Collaborated in a cross-functional team of 4 to create a versatile, cross-platform app facilitating communication between dietitians and patients for gut health and weight management.",
        " Utilized Kotlin multiplatform technology for native app development across Android, iOS, and web platforms, enhancingaccessibility and scalability.",
        " Built a secure messaging feature with MongoDB, handling login, registration, and messaging interfaces. Implemented backend logic for API calls and WebSocket integration, ensuring efficient data flow.",
        " Generated weekly documentation (20+ documents) on database structure, software, and network issues, ensuring project organization and accessibility for the team.",
      ],
      technologies: ["Swift", "MongoDB", "Kotlin Multiplatform"],
      //   link: 'https://getsizzle.app/'
    },
  ]);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
