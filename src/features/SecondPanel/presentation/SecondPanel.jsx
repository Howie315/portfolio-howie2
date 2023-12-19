import React, { useEffect, useRef } from 'react';
import './SecondPanel.scss';
import Lottie from 'react-lottie-player';
import Space from "../../../spaceShip.json";
import anime from 'animejs';

const SecondPanel = () => {
  const panelRef = useRef(null); // Reference to the panel
  const titleRef = useRef(null); // Reference to the title element

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        animeText();
        observer.unobserve(entry.target); // Ensure the animation only happens once
      }
    }, {
      threshold: 0.1 // Adjust this value based on when you want the animation to start
    });

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animeText = () => {
    panelRef.current.style.opacity = 1;
    // Split text into characters
    const text = titleRef.current.textContent;
    const splitText = text.split("").map((char) => 
      char === " " ? `<span class="whitespace">&nbsp;</span>` : `<span class="char">${char}</span>`).join("");
    titleRef.current.innerHTML = splitText;

    // Anime.js animation with adjusted duration and delay
    anime.timeline({ loop: false })
      .add({
        targets: '.second-panel .char',
        translateY: [-100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 800, // Reduced duration for faster animation
        delay: (el, i) => 15 * i // Reduced delay for faster sequential start
      });
};


  return (
    <div className="second-panel" ref={panelRef}>
      <h1 className="panel2-title" ref={titleRef}>
        My passion for innovative technologies and efficient coding practices has led me to create digital experiences
      </h1>

      <Lottie 
        loop
        animationData={Space}
        play
        className="lottie-animation2"
      />
    </div>
  );
};

export default SecondPanel;
