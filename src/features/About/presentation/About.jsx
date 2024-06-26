import React, { useEffect, useRef } from "react";
import "./About.scss";
import anime from "animejs";
import Profile from "../../../imgs/profile.JPG";
import Lottie from "react-lottie-player";
import Tennis from "../../../tennis.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const About = () => {
  const aboutRef = useRef(null);
  const imageRef = useRef(null); // Reference for the image container

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          anime({
            targets: aboutRef.current,
            translateY: [100, 0], // Start from 100px below
            opacity: [0, 1], // Fade in
            scale: [0.9, 1], // Scale up
            easing: "easeOutExpo",
            duration: 1500,
          });
          observer.unobserve(entry.target); // Stop observing after animation
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the panel is in view
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    gsap.fromTo(
      imageRef.current,
      {
        scale: 1,
        filter: "brightness(100%)",
      },
      {
        scale: 1.05,
        filter: "brightness(70%)",
        paused: true,
        ease: "power1.easeOut",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      }
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-panel" id="about" ref={aboutRef}>
      <div className="about-me">ABOUT ME</div>
      <div className="about-content">
        <div className="about-layout">
          <div className="about-image" ref={imageRef}>
            <img src={Profile} alt="Your Description" />
            <div className="overlay"></div>
          </div>
          <div className="about-text">
            <div className="intro">Intro</div>
            <div className="paragraph">
              I'm a software engineer based in the city of Riverside,
              California. Originally, I was from Cincinnati, Ohio.
            </div>
            <br />
            <br />
            <div className="paragraph">
              I focus on creating sophisticated, user-friendly, and minimalist
              designs tailored for startups and small enterprises, aiming to
              elevate their presence in the digital realm with a significant and
              striking impact.
            </div>
            <br />
            <br />
            <div className="paragraph">
              In my downtime, I enjoy playing sports like pickleball and tennis,
              and I make it a point to work out every day, especially lifting
              weights. When time permits, I also indulge in reading manga and
              watching anime.
            </div>
            <Lottie
              loop
              animationData={Tennis}
              play
              className="lottie-animation3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
