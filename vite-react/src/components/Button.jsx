import "./Button.css";
import reactLogo from "../assets/react.svg";
import "../App.css";
import { useState } from "react";

export const Button = () => {
  // const [state, setState] = useState(0)
  // return (
  //   <div>
  //     <button id='click-btn' className='shared-btn' onClick={() => setState((s) => s + 1)}>Click me: {state}</button>
  //   </div>
  // )
  const [state, setState] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          <button
            id="click-btn"
            className="shared-btn"
            onClick={() => setState((s) => s + 1)}
          >
            Click me: {state}
          </button>
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default Button;
