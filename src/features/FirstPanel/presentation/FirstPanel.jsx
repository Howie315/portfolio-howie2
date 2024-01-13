import React from "react";
import "./FirstPanel.scss";
import Lottie from "react-lottie-player";
import Space from "../../../Animation - 1702361057646.json";

const FirstPanel = () => {
  return (
    <div className="first-panel">
      <Lottie loop animationData={Space} play className="lottie-animation" />
      <h1 className="greeting">Howie(Hau) Nguyen</h1>
      <h2 className="service-message">Experienced Front-End Engineer</h2>
    </div>
  );
};

export default FirstPanel;
