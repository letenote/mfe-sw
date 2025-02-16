// import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
// import ReactDOM from "react-dom";
// // import { mount } from "viteReactApp/App";
// import Compo from "viteReactApp/Compo";
// // const Compo = lazy(() => import("viteReactApp/Compo"));

// const AppViteReactModule = () => {
//   // const ref = useRef(null);
//   // useEffect(() => {
//   //   mount();
//   // }, []);
//   // return (
//   //   <div className="app-vite-react-module">
//   //     <app-root></app-root>
//   //   </div>
//   // );
//   // return (
//   //   <div>
//   //     <Suspense fallback={<div>Loading...</div>}>
//   //       <Compo />
//   //     </Suspense>
//   //   </div>
//   // );
//   console.log("lll", Compo);
//   return <Compo />;
// };

// export default AppViteReactModule;

// // ===========
// const Test = require("viteReactApp/Compo").default;
// console.log("lll", Test);
// export default <Test />;

// import ReactDOMServer from "react-dom/server";

// async function fetchImport() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = (await import("viteReactApp/Compo")).default;
//       resolve(
//         ReactDOMServer.renderToString(
//           res({
//             caption: "React Button in vue",
//           })
//         )
//       );
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

// export default fetchImport;
// ===================
import { Button } from "viteJSRemote/Button";
import { App } from "viteJSRemote/App";

const AppViteReactJSModule = () => {
  // const ref = useRef(null);
  // useEffect(() => {
  //   mount();
  // }, []);
  // return (
  //   <div className="app-vite-react-module">
  //     <app-root></app-root>
  //   </div>
  // );
  // return (
  //   <div>
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <Compo />
  //     </Suspense>
  //   </div>
  // );
  console.log("MOUNT:AppViteReactJSModule", {
    Button,
    App,
    node: "version 23.2.0",
    react: "version 18.2.0",
    vite: "version 4.0.5",
  });
  return <App />;
};

export default AppViteReactJSModule;
