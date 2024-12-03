importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.3.0/workbox-sw.min.js"
);

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: true,
});

workbox.precaching.precacheAndRoute(["http://localhost:4200/remoteEntry.js"]);

// Demonstrates using default cache
workbox.routing.registerRoute(
  new RegExp(".*\\.(?:js)"),
  new workbox.strategies.NetworkFirst()
);

// Demonstrates a custom cache name for a route.
workbox.routing.registerRoute(
  new RegExp(".*\\.(?:png|jpg|jpeg|svg|gif)"),
  new workbox.strategies.CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 3,
      }),
    ],
  })
);
