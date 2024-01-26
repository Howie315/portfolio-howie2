import React from "react";
import "./MobileMenu.scss";
const MobileMenu = ({ closeMenu }) => {
  const handleClick = (target) => {
    closeMenu(); // Close the menu when a link is clicked
    // Add any additional actions, like smooth scrolling to the target
  };

  return (
    <div className="mobile-menu">
      <ul>
        <li>
          <a href="#about" onClick={() => handleClick("#about")}>
            About
          </a>
        </li>
        <li>
          <a href="#experience" onClick={() => handleClick("#experience")}>
            Experience
          </a>
        </li>
        <li>
          <a href="#projects" onClick={() => handleClick("#projects")}>
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => handleClick("#contact")}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
