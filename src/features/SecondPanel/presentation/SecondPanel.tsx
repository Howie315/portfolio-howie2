import { useEffect, useRef } from "react";
import "./SecondPanel.scss";
import Lottie from "react-lottie-player";
import Space from "../../../spaceShip.json";
import anime from "animejs";

const SecondPanel = (): React.JSX.Element => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          animeText();
          observer.unobserve(entry.target); // Ensure the animation only happens once
        }
      },
      {
        threshold: 0.1, // Adjust this value based on when you want the animation to start
      },
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animeText = (): void => {
    const panelElement = panelRef.current;
    const titleElement = titleRef.current;

    if (!panelElement || !titleElement) {
      return;
    }

    panelElement.style.opacity = "1";
    const text = titleElement.textContent ?? "";
    const splitText = text
      .split(" ")
      .map((word) => `<span class="word">${word} </span>`)
      .join("");
    titleElement.innerHTML = splitText;

    anime.timeline({ loop: false }).add({
      targets: ".second-panel .word",
      translateY: [-100, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1000,
      delay: (_element: Element, index: number) => 50 * index,
    });
  };

  return (
    <div className="second-panel" ref={panelRef}>
      <div className="panel2-title" ref={titleRef}>
        My passion for innovative technologies and efficient coding practices
        has led me to create digital experiences
      </div>

      <Lottie loop animationData={Space} play className="lottie-animation2" />
    </div>
  );
};

export default SecondPanel;
