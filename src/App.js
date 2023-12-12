import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./features/Navigation/presentation/Navigation";
import FirstPanel from "./features/FirstPanel/presentation/FirstPanel";
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <FirstPanel />
      </div>
    </Router>
  );
}

export default App;
