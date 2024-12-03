import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// const ButtonReact = React.lazy(() => import("react_component/Button"));
import ButtonaAngularModule from "./modules/ButtonaAngularModule";
import registerServiceWorker from "../serviceWorkerRegistration";

const App = () => {
  return (
    <div className="container">
      <div>
        <div>Name: react-app-1</div>
        <div>Framework: react</div>
      </div>
      <React.Suspense>
        {/* <ButtonReact title={"ClickMe:import:from:component"} /> */}
        <ButtonaAngularModule />
      </React.Suspense>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
registerServiceWorker("/ngsw-worker.js");
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/ngsw-worker.js")
//       .then((registration) => {
//         console.log("SW registered: 1", { registration, navigator });
//         // =========== AMAN ===========//
//         // ensure the case when the updatefound event was missed is also handled
//         // by re-invoking the prompt when there's a waiting Service Worker
//         if (registration.waiting) {
//           invokeServiceWorkerUpdateFlow(registration);
//         }

//         // detect Service Worker update available and wait for it to become installed
//         registration.addEventListener("updatefound", () => {
//           console.log("SW registered: 2", { registration, navigator });
//           if (registration.installing) {
//             // wait until the new Service worker is actually installed (ready to take over)
//             registration.installing.addEventListener("statechange", () => {
//               if (registration.waiting) {
//                 console.log("SW registered: 3", { registration, navigator });
//                 // if there's an existing controller (previous Service Worker), show the prompt
//                 if (navigator.serviceWorker.controller) {
//                   invokeServiceWorkerUpdateFlow(registration);
//                 } else {
//                   // otherwise it's the first install, nothing to do
//                   console.log("Service Worker initialized for the first time");
//                 }
//               }
//             });
//           }
//         });

//         let refreshing = false;
//         // detect controller change and refresh the page
//         navigator.serviceWorker.addEventListener("controllerchange", () => {
//           if (!refreshing) {
//             window.location.reload();
//             refreshing = true;
//           }
//         });
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }

// function invokeServiceWorkerUpdateFlow(registration) {
//   // TODO implement your own UI notification element
//   let text =
//     "NR: A new version of the app is available. Please refresh your browser window or click OK button.";
//   // if (confirm(text) == true) return window.location.reload();
//   if (confirm(text) == true) {
//     if (registration.waiting) {
//       // let waiting Service Worker know it should became active
//       registration.waiting.postMessage("SKIP_WAITING");
//     }
//   }
//   // notification.show("New version of the app is available. Refresh now?");
//   // notification.addEventListener("click", () => {
//   //   if (registration.waiting) {
//   //     // let waiting Service Worker know it should became active
//   //     registration.waiting.postMessage("SKIP_WAITING");
//   //   }
//   // });
// }
