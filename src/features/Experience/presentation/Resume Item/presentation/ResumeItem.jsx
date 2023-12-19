// import React, { useState, useEffect, useRef } from 'react';
// import anime from 'animejs';
// import './ResumeItem.scss';

// const ResumeItem = ({ title, duration, description, technologies, link }) => {
//   const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
//   const descriptionRef = useRef(null);
//   const intervalRef = useRef(null);

//   // Function to advance to the next description
//   const nextDescription = () => {
//     setCurrentDescriptionIndex(prevIndex => 
//       (prevIndex + 1) % description.length
//     );
//   };

//   useEffect(() => {
//     const animateDescription = () => {
//       anime({
//         targets: descriptionRef.current,
//         translateX: [100, 0], // Slide in from right
//         opacity: [0, 1],
//         easing: 'easeOutQuad',
//         duration: 500 // Duration of the slide effect
//       });
//     };

//     animateDescription();
//   }, [currentDescriptionIndex, description]);

//   useEffect(() => {
//     // Set up an interval for autoplay
//     intervalRef.current = setInterval(nextDescription, 6000);

//     return () => {
//       clearInterval(intervalRef.current);
//     };
//   }, [description]);

//   const handleDotClick = (index) => {
//     setCurrentDescriptionIndex(index);
//     // Reset the interval when manually navigating
//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(nextDescription, 6000);
//   };

//   return (
//     <a href={link} className="resume-item" target="_blank" rel="noopener noreferrer">
//       <h2 className="resume-title">{title}</h2>
//       <p className="duration">{duration}</p>
//       <div className="descriptions" ref={descriptionRef}>
//         {description && description.length > 0 && description[currentDescriptionIndex]}
//       </div>
//       {description && description.length > 1 && (
//         <div className="description-dots">
//           {description.map((_, index) => (
//             <span 
//               key={index} 
//               className={`dot ${index === currentDescriptionIndex ? 'active' : ''}`} 
//               onClick={() => handleDotClick(index)}
//             />
//           ))}
//         </div>
//       )}
//       <div className="technologies">
//         {technologies.map((tech, index) => (
//           <span key={index} className="tech">{tech}</span>
//         ))}
//       </div>
//     </a>
//   );
// };

// export default ResumeItem;
import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './ResumeItem.scss';
import Arrow from "../../../../../imgs/arrow.svg";

const ResumeItem = ({ title, duration, description, technologies, link }) => {
  const descriptionContainerRef = useRef(null);

  const handleMouseEnter = () => {
    anime({
      targets: descriptionContainerRef.current.children,
      translateY: [20, 0], // Move-up effect
      opacity: [0, 1],
      delay: anime.stagger(200), // Staggered delay for each description
      easing: 'cubicBezier(0.22, 1, 0.36, 1)', // Smooth easing
      duration: 800 // Synchronized with CSS transitions
    });
  };
  
  

  return (
    <a href={link} className="resume-item" target="_blank" rel="noopener noreferrer" 
       onMouseEnter={handleMouseEnter} onMouseLeave={() => {}}>
      {/* <h2 className="resume-title">{title}</h2> */}
      <div className="title-container">
        <h2 className="resume-title">{title}</h2>
        
        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
                </svg>      </div>
      <p className="duration">{duration}</p>
      <div ref={descriptionContainerRef} className="description-container">
        {description.map((desc, index) => (
          <div key={index} className="description">{desc}</div>
        ))}
      </div>
      <div className="technologies">
        {technologies.map((tech, index) => (
          <span key={index} className="tech">{tech}</span>
        ))}
      </div>
    </a>
  );
};

export default ResumeItem;
