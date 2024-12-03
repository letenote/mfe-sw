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

    const cacheName = "remote-mfe-angular-v1";
    caches.keys().then(async function (names) {
      // console.log("DEBUG:SWS-activate-0", { names, wb });
      for (let name of names) {
        if (name === cacheName) {
          const cacheStorage = await caches.open(cacheName);
          // console.log("DEBUG:SWS-activate-1", {
          //   cacheStorage,
          //   names,
          //   name,
          //   wb,
          // });
          cacheStorage.keys().then((cache) => {
            cache.forEach(async (request, index, array) => {
              const cachedResponse = await cacheStorage.match(request.url);
              console.log("DEBUG:SWS-activate-2", {
                cache,
                request,
                index,
                array,
                cachedResponse,
                cacheStorage,
              });
              if (!cachedResponse) {
                // caches.delete("remote-mfe-angular-v1");
                // const broadcast = new BroadcastChannel("channel-123");
                // broadcast.postMessage({
                //   type: "remote-mfe-angular-v1-updated",
                //   message: `Remote MFe app update is available!. Click OK to refresh`,
                // });
                console.warn(
                  "NAR: A new version of the app is available.",
                  "getFileName"
                );
              }

              // handle delete remoteEntry request
              if (request.url.includes("/remoteEntry")) {
                cacheStorage.delete(request);
              }
              // // handle delete xhr request
              // if (request.url.includes("/users")) {
              //   cacheStorage.delete(request);
              // }
            });
          });
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
