import loginScreen from "../../../../imgs/GymBois/login-screen.png";
import homeScreen from "../../../../imgs/GymBois/home-screen.png";
import workouts from "../../../../imgs/GymBois/workouts.png";
import searchWorkouts from "../../../../imgs/GymBois/search-workouts.png";
import timer from "../../../../imgs/GymBois/timer.png";
import calendar from "../../../../imgs/GymBois/calendar.png";
import settings from "../../../../imgs/GymBois/settings.png";
import vacation from "../../../../imgs/GymBois/vacation.png";
import arrowDiagonal from "../../../../imgs/arrowDiagonal.svg";
import "./GymboisProj.scss";

const GymBoisProj = () => {
  return (
    <div className="gymbois-application">
      <div className="gymbois-row">
        <div className="gymbois-tile">
          <img
            src={loginScreen}
            alt="Login Screen"
            className="project-gymbois"
          />
        </div>
        <div className="gymbois-tile">
          <img src={homeScreen} alt="Home Screen" className="project-gymbois" />
        </div>

        <div className="gymbois-tile">
          <img src={workouts} alt="Home Screen" className="project-gymbois" />
        </div>
        <div className="gymbois-tile">
          <img src={timer} alt="Home Screen" className="project-gymbois" />
        </div>
        <div className="gymbois-tile">
          <img
            src={searchWorkouts}
            alt="Home Screen"
            className="project-gymbois"
          />
        </div>
        <div className="gymbois-tile">
          <img src={calendar} alt="Home Screen" className="project-gymbois" />
        </div>
        <div className="gymbois-tile">
          <img src={settings} alt="Home Screen" className="project-gymbois" />
        </div>
        <div className="gymbois-tile">
          <img src={vacation} alt="Home Screen" className="project-gymbois" />
        </div>
      </div>

      <div className="project1">GymBois Fitness App</div>

      <div className="linkDesc">
        <div className="projectDesc">
          Designed a versatile fitness tracker mobile app with 11 distinctive
          features such as exercise tracking and log maintenance, to enhance
          users’ fitness journeys, using React Native and Firebase. Utilized
          responsive and Mobile-First Design principles to ensure a seamless,
          efficient, and intuitive user experience. Demonstrated meticulous
          attention to detail by ensuring compatibility across multiple devices
          and screen sizes.
        </div>
        <div className="project-link">
          <a
            href="https://github.com/CS180-spring/cs180-22-jymbois"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here
          </a>
          <img src={arrowDiagonal} className="arrow-icon2" />
        </div>
      </div>

      <div className="technologiesItem">
        <div className="techItem">React Native</div>
        <div className="techItem">Firebase</div>
        <div className="techItem">Javascript</div>
        <div className="techItem">Expo Go</div>
      </div>
    </div>
  );
};

export default GymBoisProj;
