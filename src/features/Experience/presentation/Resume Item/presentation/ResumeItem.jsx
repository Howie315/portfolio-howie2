import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import "./ResumeItem.scss";
import Arrow from "../../../../../imgs/arrow.svg";

const ResumeItem = ({ title, duration, description, technologies, link }) => {
  const descriptionContainerRef = useRef(null);

  const handleMouseEnter = () => {
    anime({
      targets: descriptionContainerRef.current.children,
      translateY: [20, 0], // Move-up effect
      opacity: [0, 1],
      delay: anime.stagger(200), // Staggered delay for each description
      easing: "cubicBezier(0.22, 1, 0.36, 1)", // Smooth easing
      duration: 800, // Synchronized with CSS transitions
    });
  };

  return (
    <a
      href={link}
      className="resume-item"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {}}
    >

      <div className="title-container">
        <div className="resume-title">{title}</div>
        <svg
          className="arrowIcon1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>{" "}
      </div>
      <div className="duration">{duration}</div>
      <div ref={descriptionContainerRef} className="description-container">
        {description.map((desc, index) => (
          <div key={index} className="description">
            {desc}
          </div>
        ))}
      </div>
      <div className="technologies">
        {technologies.map((tech, index) => (
          <span key={index} className="tech">
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
};

export default ResumeItem;
