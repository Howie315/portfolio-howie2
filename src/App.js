import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./features/Navigation/presentation/Navigation";
import FirstPanel from "./features/FirstPanel/presentation/FirstPanel";
import SecondPanel from "./features/SecondPanel/presentation/SecondPanel";
import About from "./features/About/presentation/About";
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <FirstPanel />
        <SecondPanel />
        <About />
      </div>
    </Router>
  );
}

export default App;
