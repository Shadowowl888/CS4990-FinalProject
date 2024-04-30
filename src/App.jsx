import { Link, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Caddie from "./pages/Caddie";
import "./App.css";

const App = () => {
  // const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/caddie",
      element: <Caddie />
    },
  ]);

  return (
    <div className="App">
      <div className="header">
        <div className="header-name">
          <h2>CaddieAI 🏌️</h2>
        </div>
        <div className="header-buttons">
          <Link to="/"><button className="header-button">Home</button></Link>
          <Link to="/caddie"><button className="header-button">Caddie</button></Link>
        </div>
      </div>
      <div className="content">
        {element}
      </div>
    </div>
  );
};

export default App;