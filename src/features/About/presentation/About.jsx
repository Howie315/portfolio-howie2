import React, { useEffect, useRef } from 'react';
import './About.scss';
import anime from 'animejs';
import Profile from "../../../imgs/profile.JPG";
const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        anime({
          targets: aboutRef.current,
          translateY: [100, 0], // Start from 100px below
          opacity: [0, 1], // Fade in
          scale: [0.9, 1], // Scale up
          easing: 'easeOutExpo',
          duration: 1500
        });
        observer.unobserve(entry.target); // Stop observing after animation
      }
    }, {
      threshold: 0.1 // Trigger when 10% of the panel is in view
    });

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-panel" id="about" ref={aboutRef}>

      <div className = "about-me">ABOUT ME</div>
      <div className="about-content">
 

        <div className="about-layout">
          

          <div className="about-image">
            <img src={Profile} alt="About Me" />
          </div>
          <div className="about-text">
            <h3>Intro</h3>
            <p>I'm a software engineer based in the city of Riverside, California. Originally, I was from Cincinnati Ohio.</p>
            <br />
            <br />
            <p>I focus on creating sophisticated, user-friendly, and minimalist designs tailored for startups and small enterprises, aiming to elevate their presence in the digital realm with a significant and striking impact.</p>
            <br />
            <br />
            <p>In my downtime, I enjoy playing sports such as pickleball and tennis. In addition, I like to workout everday espically lifting.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
