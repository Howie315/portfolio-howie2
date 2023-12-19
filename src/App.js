import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./features/Navigation/presentation/Navigation";
import FirstPanel from "./features/FirstPanel/presentation/FirstPanel";
import SecondPanel from "./features/SecondPanel/presentation/SecondPanel";
import About from "./features/About/presentation/About";
import Experience from "./features/Experience/presentation/Experience";
import { ResumeProvider } from "./features/Experience/presentation/Resume Item/presentation/ResumeProvider";
function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="App">
          <Navigation />
          <FirstPanel />
          <SecondPanel />
          <About />
          <Experience />
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;
