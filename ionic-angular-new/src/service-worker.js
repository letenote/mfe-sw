// import { precacheAndRoute } from "workbox-precaching";
// import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

// // Precaching for fast load of initial resources
// precacheAndRoute(self.__WB_MANIFEST);

// // Example runtime caching strategies
// self.addEventListener("fetch", (event) => {
//   if (event.request.url.includes("/api/")) {
//     // Network-first strategy for API requests
//     event.respondWith(new NetworkFirst().handle({ event }));
//   } else {
//     // Stale-while-revalidate for other resources
//     event.respondWith(new StaleWhileRevalidate().handle({ event }));
//   }
// });
