import { FormEvent, useEffect, useState } from "react";
import "./Contact.scss";
import gsap from "gsap";

const applyHoverEffect = (): (() => void) => {
  const links = document.querySelectorAll<HTMLAnchorElement>(
    ".email-link, .number-link, .social-media-link",
  );

  const cleanupCallbacks: Array<() => void> = [];

  links.forEach((link) => {
    const handleMouseEnter = (): void => {
      gsap.to(link, {
        scale: 1.05,
        color: "#a7c4b5",
        duration: 0.3,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = (): void => {
      gsap.to(link, {
        scale: 1,
        color: "#333",
        duration: 0.3,
        ease: "power1.out",
      });
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    cleanupCallbacks.push(() => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    });
  });

  return () => {
    cleanupCallbacks.forEach((cleanup) => cleanup());
  };
};

const Contact = (): JSX.Element => {
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    const cleanupHoverEffects = applyHoverEffect();

    return cleanupHoverEffects;
  }, []);

  const validateForm = (formData: FormData): string => {
    const errors: string[] = [];
    const fieldNames = {
      name: "name",
      email: "email",
      message: "message",
    };

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && !value.trim()) {
        const fieldLabel = fieldNames[key as keyof typeof fieldNames] ?? key;
        errors.push(`${fieldLabel} is required.`);
      }
    }

    return errors.join(" ");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const errorMessage = validateForm(formData);

    if (errorMessage) {
      setSubmissionMessage(errorMessage);
      return;
    }

    const response = await fetch("https://formspree.io/f/xnqejzjk", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      console.log("Form successfully submitted");
      setSubmissionMessage("Thank you! Your message has been sent.");
    } else {
      console.log("Error submitting form");
      setSubmissionMessage(
        "An error occurred while sending your message. Please try again later.",
      );
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
          {submissionMessage && (
            <div className="submission-message">{submissionMessage}</div>
          )}
        </form>

        <div className="contact-column">
          <div className="email-number">MORE ENQUIRES</div>
          <div className="basic-contact">GENERAL CONTACT</div>

          <a href="mailto:nguyen.howie2010@gmail.com" className="email-link">
            <div className="email">nguyen.howie2010@gmail.com</div>
          </a>
          <a href="tel:+15132825266" className="number-link">
            <div className="number">+1 513 282-5266</div>
          </a>
          <div className="socials">SOCIALS</div>

          <a
            href="https://www.linkedin.com/in/howie-nguyen-491587216/"
            className="social-media-link"
          >
            <div className="social-link">LinkedIn</div>
          </a>

          <a href="https://github.com/Howie315" className="social-media-link">
            <div className="social-link">Github</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
