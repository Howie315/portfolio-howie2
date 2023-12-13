import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import NameLogo from '../../../imgs/angle-right.svg'; // Replace with the path to your photo
import "./Navigation.scss";
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

const Navigation = () => {
    const handleClick = (e, target) => {
        e.preventDefault(); // Prevent default anchor behavior
        gsap.to(window, { duration: 1, scrollTo: target }); // Smooth scroll to target
      };
  return (
    <div className="navigation-container">
      <div className="profile-section">
        <h1>Howie</h1>
        <img src={NameLogo} alt="Your Name" className = "logo" />
        
      </div>
      
      <nav className="nav-links">
        <ul>
          <li className = "nav-item">        <a href="#about" onClick={(e) => handleClick(e, '#about')}>about</a></li>
          <li className = "nav-item"> <a href="#experience" onClick={(e) => handleClick(e, '#experience')}>experience</a></li>
          <li className = "nav-item">            <a href="#projects" onClick={(e) => handleClick(e, '#projects')}>projects</a>
</li>
          <li className="contact-button">
            <a href="mailto:nguyen.howie2010@gmail.com">Let's Contact</a>
          </li>
        </ul>
      </nav>

      {/* <div id="about"></div>
      <div id="experience"></div>
      <div id="projects"></div> */}
     
    </div>
  );
};

export default Navigation;
