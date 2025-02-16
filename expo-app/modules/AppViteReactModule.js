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
import { Button } from "viteRemote/Button";
import { App } from "viteRemote/App";

const AppViteReactModule = () => {
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
  console.log("lll", { Button, App });
  return <Button />;
};

export default AppViteReactModule;
