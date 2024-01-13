import React, { useEffect, useRef, useContext } from "react";
import "./Experience.scss"; // Make sure to create a corresponding SCSS file
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ResumeItem from "./Resume Item/presentation/ResumeItem";
import { ResumeContext } from "./Resume Item/presentation/ResumeProvider";
import anime from "animejs";

const Experience = () => {
  const { resumeData } = useContext(ResumeContext);
  const panelRef = useRef(null); // Reference to the experience panel

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: ".resume-item",
              translateY: [100, 0], // Moves up from below
              opacity: [0, 1],
              delay: anime.stagger(100), // Delay each item slightly
              easing: "easeOutQuad",
            });
            observer.unobserve(panelRef.current); // Optional: Stop observing after animation
          }
        });
      },
      { threshold: 0.1 }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect(); // Cleanup the observer
  }, []);

  return (
    <div className="experience-panel" ref={panelRef} id="experience">
      <div className="experience-content">
        <h2>EXPERIENCE</h2>
      </div>

      <div className="resume-list">
        {resumeData.map((item, index) => (
          <ResumeItem
            key={index}
            title={item.title}
            duration={item.duration}
            description={item.description}
            technologies={item.technologies}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
