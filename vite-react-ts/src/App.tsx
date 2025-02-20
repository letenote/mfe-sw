import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

export const App = () => {
  const [count, setCount] = useState(0);
  console.log("MOUNT:REMOTE:VITE:REACT:TS:GET-ENV", {
    proccess: import.meta.env,
    doc: "https://vite.dev/guide/env-and-mode",
  });
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${viteLogo}`}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${reactLogo}`}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React TS</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
