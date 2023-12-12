import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import NameLogo from '../../../imgs/angle-right.svg'; // Replace with the path to your photo
import "./Navigation.scss";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <div className="profile-section">
        <h1>Howie</h1>
        <img src={NameLogo} alt="Your Name" className = "logo" />
        
      </div>
      
      <nav className="nav-links">
        <ul>
          <li className = "nav-item"><Link to="#about">about</Link></li>
          <li className = "nav-item"><Link to="#experience">experience</Link></li>
          <li className = "nav-item"><Link to="#projects">projects</Link></li>
          <li className="contact-button">
            <a href="mailto:nguyen.howie2010@gmail.com">Let's Contact</a>
          </li>
        </ul>
      </nav>

      <div id="about"></div>
      <div id="experience"></div>
      <div id="projects"></div>
     
    </div>
  );
};

export default Navigation;
