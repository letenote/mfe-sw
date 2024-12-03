import { Workbox } from "workbox-window";
let timeout;
export default function registerServiceWorker(name) {
  if ("production" !== process.env.NODE_ENV) {
    return;
  }
  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ("serviceWorker" in navigator) {
    const wb = new Workbox(name);
    console.log("DEBUG:SWS-1", { wb });

    wb.addEventListener("installed", (event) => {
      /**
       * We have the condition - event.isUpdate because we don't want to show
       * this message on the very first service worker installation,
       * only on the updated
       */
      console.log("DEBUG:SWS-2", { wb, event });
      if (event.isUpdate) {
        if (confirm(`New app update is available!. Click OK to refresh`)) {
          window.location.reload();
        }
      }
    });

    new BroadcastChannel("channel-123").onmessage = async (event) => {
      console.log("DEBUG:SWS-8", { wb, event });
      if (event.data && event.data.type === `remote-mfe-angular-v1-updated`) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (confirm(event.data.message)) {
            window.location.reload();
          }
        }, 1000);
      }
    };

    wb.register();
  }
}
