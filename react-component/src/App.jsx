import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Button from "./components/Button";

const App = () => (
  <div className="container">
    <div>Name: react-component</div>
    <div>Framework: react</div>
    <Button title={"from:component"} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
