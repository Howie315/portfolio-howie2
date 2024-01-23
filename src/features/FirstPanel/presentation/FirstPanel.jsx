import React from "react";
import "./FirstPanel.scss";
import Lottie from "react-lottie-player";
import Space from "../../../Animation - 1702361057646.json";

const FirstPanel = () => {
  return (
    <div className="first-panel">
      <Lottie loop animationData={Space} play className="lottie-animation" />
      <div className="greeting">Howie(Hau) Nguyen</div>
      <div className="service-message">Experienced Front-End Engineer</div>
    </div>
  );
};

export default FirstPanel;
