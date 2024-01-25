import React, { useEffect } from "react";
import "./Contact.scss";
import gsap from "gsap";

const applyHoverEffect = () => {
  // Select all the link elements
  const links = document.querySelectorAll(
    ".email-link, .number-link, .social-media-link"
  );

  links.forEach((link) => {
    // Hover animation
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        scale: 1.05,
        color: "#a7c4b5",
        duration: 0.3,
        ease: "power1.out",
      });
    });

    // Reset animation
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        scale: 1,
        color: "#333",
        duration: 0.3,
        ease: "power1.out",
      });
    });
  });
};

const Contact = () => {
  useEffect(() => {
    applyHoverEffect();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Post the form data to Formspree
    const response = await fetch("https://formspree.io/f/xnqejzjk", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // Handle success (show success message, clear form, etc.)
      console.log("Form successfully submitted");
    } else {
      // Handle error (show error message)
      console.log("Error submitting form");
    }
  };
  return (
    <div className="contact-panel" id="contact">
      <div className="contact-title">CONTACT</div>

      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-subtitle">LOOKING FOR WORK?</div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="form-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="form-input"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="form-textarea"
            required
          ></textarea>
          <button type="submit" className="form-button">
            Let's Connect
          </button>
        </form>

        <div className="contact-column">
          <div className="email-number">MORE ENQUIRES</div>
          <div className="basic-contact">GENERAL CONTACT</div>

          <a href="mailto:nguyen.howie2010@gmail.com" class="email-link">
            <div class="email">nguyen.howie2010@gmail.com</div>
          </a>
          <a href="tel:+15132825266" class="number-link">
            <div class="number">+1 513 282-5266</div>
          </a>
          <div className="socials">SOCIALS</div>

          <a
            href="https://www.linkedin.com/in/howie-nguyen-491587216/"
            class="social-media-link"
          >
            <div class="social-link">LinkedIn</div>
          </a>

          <a href="https://github.com/Howie315" class="social-media-link">
            <div class="social-link">Github</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
