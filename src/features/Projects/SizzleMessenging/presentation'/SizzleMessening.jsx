import sizzleLogin from "../../../../imgs/SizzleMessenging/sizzle-login.png";
import homePage from "../../../../imgs/SizzleMessenging/home-page.png";
import patientInfo from "../../../../imgs/SizzleMessenging/patient-info.png";
import messenging from "../../../../imgs/SizzleMessenging/messenging.png";
import arrowDiagonal from "../../../../imgs/arrowDiagonal.svg";
import "./SizzleMessenging.scss";

const SizzleMessenging = () => {
  return (
    <div className="sizzle-application">
      <div className="sizzle-row">
        <div className="sizzle-tile">
          <img
            src={sizzleLogin}
            alt="Login Screen"
            className="project-sizzle"
          />
        </div>
        <div className="sizzle-tile">
          <img src={homePage} alt="Home Page" className="project-sizzle" />
        </div>
      </div>
      <div className="sizzle-row">
        <div className="sizzle-tile">
          <img
            src={patientInfo}
            alt="Patient Info"
            className="project-sizzle"
          />
        </div>
        <div className="sizzle-tile">
          <img src={messenging} alt="Messenging" className="project-sizzle" />
        </div>
      </div>

      <div className="project1">Sizzle Messaging App</div>

      <div className="linkDesc">
        <div className="projectDesc">
          Collaborated in a cross-functional team of 4 to create a versatile,
          cross-platform app facilitating communication between dietitians and
          patients for gut health and weight management. Utilized Kotlin
          multiplatform technology for native app development across Android,
          iOS, and web platforms, enhancing accessibility and scalability. Built
          a secure messaging feature with MongoDB, handling login, registration,
          and messaging interfaces.
        </div>
        <div className="project-link">
          <a
            href="https://github.com/Howie315/Sizzle-Messaging"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here
          </a>
          <img src={arrowDiagonal} className="arrow-icon2" />
        </div>
      </div>

      <div className="technologiesItem">
        <div className="techItem">Swift</div>
        <div className="techItem">Android</div>
        <div className="techItem">React</div>
        <div className="techItem">CSS</div>
        <div className="techItem">MongoDB</div>
        <div className="techItem">Kotlin Multiplatform</div>
      </div>
    </div>
  );
};

export default SizzleMessenging;
