import React, { useEffect, useRef } from 'react';
import './Experience.scss'; // Make sure to create a corresponding SCSS file
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Experience = () => {
 
  return (
    <div className="experience-panel" id="experience" >
      <div className="experience-content">
        <h2>EXPERIENCE</h2>
        {/* Add your experience content here */}
        <p>Detail your professional experiences, achievements, skills, etc.</p>
      </div>
    </div>
  );
};

export default Experience;
