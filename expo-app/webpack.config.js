const createExpoWebpackConfig = require("@expo/webpack-config");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = async (env, argv) => {
  const isProduction = env.mode === "production";
  // :: safe
  // const config = await createExpoWebpackConfig({
  //   ...env,
  //   ...argv,
  // });
  // :: test
  const config = await createExpoWebpackConfig(
    {
      ...env,
      performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },
    },
    argv
  );

  config.optimization.minimize = isProduction;
  config.devtool = !isProduction;
  // :: bootstrap for share or expose mfe
  config.entry = path.resolve(__dirname, "./index.js");
  config.output = {
    ...config.output,
    uniqueName: "expo_app",
    publicPath: "auto",
    scriptType: "text/javascript",
  };

  config.plugins.push(
    new ModuleFederationPlugin({
      name: "expo_app",
      filename: "remoteEntry.js",
      remotes: {
        react_component: "react_component@http://localhost:3001/remoteEntry.js",
        ionicAngularApp: "ionicAngularApp@http://localhost:4200/remoteEntry.js",
      },
      exposes: {
        "./Button": "./components/Button",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: true,
        },
        expo: {
          singleton: true,
          requiredVersion: deps.expo,
          eager: true,
        },
        "react-native": {
          singleton: true,
          requiredVersion: deps["react-native"],
          eager: true,
        },
        "react-native-web": {
          singleton: true,
          requiredVersion: deps["react-native-web"],
          eager: true,
        },
      },
    })
  );

  if (isProduction) {
    config.plugins.push(
      // Generate a service worker script that will precache, and keep up to date,
      // the HTML & assets that are part of the webpack build.
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, "sw/ngsw-worker.js"),
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [
          /\.map$/,
          /asset-manifest\.json$/,
          /LICENSE/,
          /\.js\.gz$/,
          // Exclude all apple touch and chrome images because they're cached locally after the PWA is added.
          /(apple-touch-startup-image|chrome-icon|apple-touch-icon).*\.png$/,
        ],
        // Bump up the default maximum size (2mb) that's precached,
        // to make lazy-loading failure scenarios less likely.
        // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      })
    );
  }

  // if (env.mode === "production") {
  //   config.plugins.push(
  //     new WorkboxPlugin.GenerateSW({
  //       swDest: "ngsw-worker.js",
  //       cacheId: "container-mfe-expo-v1",
  //       cleanupOutdatedCaches: true,
  //       // these options encourage the ServiceWorkers to get in there fast
  //       // and not allow any straggling "old" SWs to hang around
  //       clientsClaim: true,
  //       skipWaiting: true,
  //       // exclude: [/[^.\n](remoteEntry)[^/\n]*/],
  //       // navigateFallback: "/index.html",
  //       // navigateFallbackDenylist: [
  //       //   // ga bisa async
  //       //   new RegExp("/users"),
  //       //   new RegExp("/remoteEntry"),
  //       // ],
  //       runtimeCaching: [
  //         // {
  //         //   urlPattern: new RegExp("/users/"), // ga bisa async
  //         //   handler: "NetworkOnly",
  //         // },
  //         // {
  //         //   urlPattern: /\/remoteEntry\//, //new RegExp("/remoteEntry"),  // ga bisa async
  //         //   handler: "NetworkOnly",
  //         // },
  //         // {
  //         //   // Routing via a matchCallback function:
  //         //   urlPattern: ({ request, url }) => {
  //         //     const host = "http://localhost:4200";
  //         //     // const cacheName = "remote-mfe-angular-v1";
  //         //     // const cacheStorage = await caches.open(cacheName);
  //         //     console.log("QWERT-0", {
  //         //       request,
  //         //       url,
  //         //       origin: url.origin,
  //         //       href: url.href,
  //         //       isRemote: url.href.includes("remoteEntry"),
  //         //     });

  //         //     // if (url.href.includes("/users")) {
  //         //     //   await cacheStorage.add(url);
  //         //     // }

  //         //     // if (url.origin === host) {
  //         //     //   // const cacheName = "remote-mfe-angular-v1";
  //         //     //   // const splitRequestUrl = request.url.split(`${host}`);
  //         //     //   // const getFileName = splitRequestUrl[splitRequestUrl.length - 1];
  //         //     //   // console.log("QWERT-1", { request, url, getFileName });
  //         //     //   // const cacheStorage = caches.open(cacheName);
  //         //     //   // if (getFileName === "/remoteEntry.js") {
  //         //     //   //   cacheStorage.add(url);
  //         //     //   // }
  //         //     //   // const cachedResponse = cacheStorage.match(request.url);
  //         //     //   // if (!cachedResponse) {
  //         //     //   //   // caches.delete("remote-mfe-angular-v1");
  //         //     //   //   const broadcast = new BroadcastChannel("channel-123");
  //         //     //   //   broadcast.postMessage({
  //         //     //   //     type: "remote-mfe-angular-v1-updated",
  //         //     //   //     message: `Remote MFe app update is available!. Click OK to refresh`,
  //         //     //   //   });
  //         //     //   //   console.warn(
  //         //     //   //     "NAR: A new version of the app is available.",
  //         //     //   //     "getFileName"
  //         //     //   //   );
  //         //     //   // }
  //         //     // }
  //         //     // ================ //
  //         //     return url.origin === host;
  //         //   },
  //         //   handler: "CacheFirst",
  //         //   // in case MFE => suppport only "NetworkFirst" & "StaleWhileRevalidate"
  //         //   options: {
  //         //     cacheName: "remote-mfe-angular-v1",
  //         //     expiration: {
  //         //       maxEntries: 1000,
  //         //       maxAgeSeconds: 24 * 60 * 60 * 30, // 30 Days,
  //         //       // maxAgeSeconds: 24 * 60 * 60 * 7, // cache for 7 days
  //         //       // maxAgeSeconds: 24 * 60 * 60 * 3, // cache for 3 days
  //         //       // maxAgeSeconds: 24 * 60 * 60, // cache for 1 days
  //         //     },
  //         //     cacheableResponse: {
  //         //       // ***REQUIRED*** or nothing is cached! => if "CacheFirst"
  //         //       statuses: [0, 200],
  //         //     },
  //         //     // backgroundSync: {
  //         //     //   name: "ticketQueue",
  //         //     //   options: {
  //         //     //     maxRetentionTime: 1 * 60,
  //         //     //     // callback: {},
  //         //     //   },
  //         //     // },
  //         //   },
  //         // },
  //         {
  //           // Routing via a matchCallback function:
  //           urlPattern: async ({ request, url }) => {
  //             const host = "http://localhost:4200";
  //             // const cacheName = "remote-mfe-angular-v1";
  //             // const cacheStorage = await caches.open(cacheName);
  //             console.log("QWERT-0", {
  //               request,
  //               url,
  //               origin: url.origin,
  //               href: url.href,
  //               isRemote: url.href.includes("remoteEntry"),
  //             });

  //             // if (url.href.includes("/users")) {
  //             //   await cacheStorage.add(url);
  //             // }//

  //             if (url.origin === host) {
  //               const cacheName = "remote-mfe-angular-v1";
  //               const splitRequestUrl = request.url.split(`${host}`);
  //               const getFileName = splitRequestUrl[splitRequestUrl.length - 1];
  //               console.log("QWERT-1", { request, url, getFileName });
  //               const cacheStorage = await caches.open(cacheName);
  //               // if (getFileName === "/remoteEntry.js") {
  //               //   await cacheStorage.add(url);
  //               // }

  //               const cachedResponse = await cacheStorage.match(request.url);
  //               if (!cachedResponse) {
  //                 // caches.delete("remote-mfe-angular-v1");
  //                 const broadcast = new BroadcastChannel("channel-123");
  //                 broadcast.postMessage({
  //                   type: "remote-mfe-angular-v1-updated",
  //                   message: `Remote MFe app update is available!. Click OK to refresh`,
  //                 });
  //                 console.warn(
  //                   "NAR: A new version of the app is available.",
  //                   "getFileName"
  //                 );
  //               }
  //             }
  //             // ================ //
  //             // return url.origin === host;
  //             return /^https:\/\/fonts\.googleapis\.com\//;
  //           },
  //           handler: "CacheFirst",
  //           // in case MFE => suppport only "NetworkFirst" & "StaleWhileRevalidate"
  //           options: {
  //             cacheName: "remote-mfe-angular-v1",
  //             expiration: {
  //               maxEntries: 1000,
  //               maxAgeSeconds: 24 * 60 * 60 * 30, // 30 Days,
  //               // maxAgeSeconds: 24 * 60 * 60 * 7, // cache for 7 days
  //               // maxAgeSeconds: 24 * 60 * 60 * 3, // cache for 3 days
  //               // maxAgeSeconds: 24 * 60 * 60, // cache for 1 days
  //             },
  //             cacheableResponse: {
  //               // ***REQUIRED*** or nothing is cached! => if "CacheFirst"
  //               statuses: [0, 200],
  //             },
  //           },
  //         },
  //       ],
  //     })
  //   );
  // }
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: "./assets", to: "assets" }],
    })
  );
  // console.log(312, JSON.stringify(config));
  return config;
};
