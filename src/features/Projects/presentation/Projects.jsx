import React, { useEffect, useRef } from "react";
import "./Projects.scss"; // Make sure to create a corresponding SCSS file

import chatApp from "../../../imgs/chatApp.svg";
import chatMessage from "../../../imgs/chatMessage.svg";
import chatAppBackground from "../../../imgs/project2 background.png";
import chatLogin from "../../../imgs/chatLogin.png";
import chatLobby from "../../../imgs/chatLobby.svg";
import arrowDiagonal from "../../../imgs/arrowDiagonal.svg";
import register from "../../../imgs/register.svg";
import GymBoisProj from "../GymboisProj/presentation/GymboisProj";
import SizzleMessenging from "../SizzleMessenging/presentation'/SizzleMessening";

import anime from "animejs";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Projects = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const triggerAnimations = () => {
      anime({
        targets: ".project-tile, .gymbois-tile, .sizzle-tile",
        translateX: [0],
        opacity: [1],
        delay: anime.stagger(100), // Adjust delay as needed
        easing: "easeOutExpo",
        duration: 500, // Adjust duration as needed
      });
    };

    ScrollTrigger.create({
      trigger: ".projects-content",
      start: "top center", // Adjust as needed
      onEnter: triggerAnimations,
    });

    anime({
      targets: ".arrow-icon2",
      translateX: [0, 5],
      duration: 500,
      easing: "easeOutQuad",
      loop: true,
      direction: "alternate",
    });

    anime({
      targets: ".project-tile",
      translateX: [-100, 0],
      opacity: [0, 1],
      delay: anime.stagger(100), // Delay each tile slightly
      easing: "easeOutExpo",
    });

    anime({
      targets: ".gymbois-tile",
      translateX: [-100, 0],
      opacity: [0, 1],
      delay: anime.stagger(100), // Delay each tile slightly
      easing: "easeOutExpo",
    });

    anime({
      targets: ".sizzle-tile",
      translateX: [-100, 0],
      opacity: [0, 1],
      delay: anime.stagger(100), // Delay each tile slightly
      easing: "easeOutExpo",
    });

    anime({
      targets: [".projectDesc", ".project-link"],
      translateY: [50, 0],
      opacity: [0, 1],
      delay: (el, i) => 200 + 50 * i, // Reduced initial delay and decreased incremental delay
      duration: 300, // Reduced duration for a quicker animation
      easing: "easeOutExpo",
    });

    anime({
      targets: ".techItem",
      scale: [0.5, 1],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 1000 }),
      easing: "spring(1, 80, 10, 0)",
    });
  }, []);

  return (
    <div className="projects-panel" id="projects">
      <div className="projects-content">
        <div className="project-title">PROJECTS</div>
        <div className="chat-application">
          <div className="project-row">
            <div className="project-tile">
              <img
                src={chatLogin}
                alt="Chat Login"
                className="project-overlay"
              />
            </div>
            <div className="project-tile">
              <img src={register} alt="Register" className="project-overlay" />
            </div>
          </div>

          <div className="project-row">
            <div className="project-tile">
              <img
                src={chatMessage}
                alt="Chat App"
                className="project-overlay"
              />
            </div>
            <div className="project-tile">
              <img
                src={chatLobby}
                alt="Chat Lobby"
                className="project-overlay"
              />
            </div>
          </div>

          <div className="project1">Real-time Chat Application</div>

          <div className="linkDesc">
            <div className="projectDesc">
              Crafted a real-time chat application using the Component-based
              Architecture to achieve modular and maintainable design.
              Integrated interactive elements chat bubbles, reactions, and emoji
              selectors. Utilizing the Repository pattern for streamlined and
              maintainable MongoDB database interactions.
            </div>
            <div className="project-link">
              <a
                href="https://github.com/boney171/Messenger-Chat-App"
                target="_blank"
              >
                Click Here
              </a>
              <img src={arrowDiagonal} className="arrow-icon2" />
            </div>
          </div>

          <div className="technologiesItem">
            <div className="techItem">Html</div>
            <div className="techItem">CSS</div>
            <div className="techItem">MongoDB</div>
            <div className="techItem">React</div>
            <div className="techItem">Express.js</div>
            <div className="techItem">Node.js</div>
            <div className="techItem">Heroku</div>
            <div className="techItem">Netlify</div>
          </div>
        </div>
        <GymBoisProj />
        <SizzleMessenging />
      </div>
    </div>
  );
};

export default Projects;
