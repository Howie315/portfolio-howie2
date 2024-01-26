import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import NameLogo from "../../../imgs/angle-right.svg"; // Replace with the path to your photo
import "./Navigation.scss";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import navIcon from "../../../imgs/icons8-hamburger-menu.svg";
import MobileMenu from "../MobileMenu/presentation/MobileMenu";
gsap.registerPlugin(ScrollToPlugin);

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    gsap.to(".mobile-menu", {
      duration: 0.5,
      xPercent: isMobileMenuOpen ? -100 : 0,
    });
  };

  const handleClick = (e, target) => {
    e.preventDefault(); // Prevent default anchor behavior
    gsap.to(window, { duration: 1, scrollTo: target }); // Smooth scroll to target
  };
  return (
    <div className="navigation-container">
      <div className="profile-section">
        <h1>Howie</h1>
        <img src={NameLogo} alt="Your Name" className="logo" />
      </div>

      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <img src={navIcon} alt="Menu" />
      </div>
      {isMobileMenuOpen && <MobileMenu closeMenu={toggleMobileMenu} />}
      <nav className="nav-links">
        <ul>
          <li className="nav-item">
            {" "}
            <a href="#about" onClick={(e) => handleClick(e, "#about")}>
              about
            </a>
          </li>
          <li className="nav-item">
            {" "}
            <a
              href="#experience"
              onClick={(e) => handleClick(e, "#experience")}
            >
              experience
            </a>
          </li>
          <li className="nav-item">
            {" "}
            <a href="#projects" onClick={(e) => handleClick(e, "#projects")}>
              projects
            </a>
          </li>
          <li className="contact-button">
            <a href="#contact" onClick={(e) => handleClick(e, "#contact")}>
              Let's Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
