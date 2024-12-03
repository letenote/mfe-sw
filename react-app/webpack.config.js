const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3000/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules"),
    ],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // experiments: {
  //   outputModule: true,
  // },
  plugins: [
    new ModuleFederationPlugin({
      name: "react_app",
      filename: "remoteEntry.js",
      // library: { type: "module" },
      remotes: {
        // react_component: "react_component@http://localhost:3001/remoteEntry.js",
        ionicAngularApp: "ionicAngularApp@http://localhost:4200/remoteEntry.js",
      },
      exposes: {},
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
      },
    }),
    new HtmlWebPackPlugin({
      title: "Football Update WPA",
      template: "./src/index.html",
    }),
    // new WorkboxPlugin.GenerateSW({
    //   swDest: "service-worker.js",
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    new WorkboxPlugin.GenerateSW({
      swDest: "ngsw-worker.js",
      cacheId: "container-mfe-react-v1",
      cleanupOutdatedCaches: true,
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "images",
            expiration: {
              maxEntries: 20,
            },
          },
        },
        {
          urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "fonts",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 7 * 24 * 60 * 60,
            },
          },
        },
        {
          // Routing via a matchCallback function:
          urlPattern: async ({ request, url }) => {
            const host = "http://localhost:4200";
            if (url.origin === host) {
              const cacheName = "remote-mfe-angular-v1";
              const splitRequestUrl = request.url.split(`${host}`);
              const getFileName = splitRequestUrl[splitRequestUrl.length - 1];

              const cacheStorage = await caches.open(cacheName);
              if (getFileName === "/remoteEntry.js") {
                await cacheStorage.add(url);
              }
              const cachedResponse = await cacheStorage.match(request.url);
              if (!cachedResponse) {
                // caches.delete("remote-mfe-angular-v1");
                const broadcast = new BroadcastChannel("channel-123");
                broadcast.postMessage({
                  type: "remote-mfe-angular-v1-updated",
                  message: `Remote MFe app update is available!. Click OK to refresh`,
                });
                console.warn(
                  "NAR: A new version of the app is available.",
                  getFileName
                );
              }
            }
            // ================ //
            return url.origin === host;
          },
          handler: "CacheFirst",
          // in case MFE => suppport only "NetworkFirst" & "StaleWhileRevalidate"
          options: {
            cacheName: "remote-mfe-angular-v1",
            expiration: {
              maxEntries: 1000,
              maxAgeSeconds: 24 * 60 * 60 * 30, // 30 Days,
              // maxAgeSeconds: 24 * 60 * 60 * 7, // cache for 7 days
              // maxAgeSeconds: 24 * 60 * 60 * 3, // cache for 3 days
              // maxAgeSeconds: 24 * 60 * 60, // cache for 1 days
            },
            cacheableResponse: {
              // ***REQUIRED*** or nothing is cached! => if "CacheFirst"
              statuses: [0, 200],
            },
          },
        },
        // {
        //   // Routing via a matchCallback function:
        //   urlPattern: async ({ request, url }) => {
        //     const host = "http://localhost:4200";
        //     if (url.origin === host) {
        //       const cacheName = "remoteMFE-angular-v2";
        //       const splitRequestUrl = request.url.split(`${host}`);
        //       const getFileName = splitRequestUrl[splitRequestUrl.length - 1];

        //       const cacheStorage = await caches.open(cacheName);
        //       const cachedResponse = await cacheStorage.match(request.url);
        //       console.log("DEBBUBG:TEST", {
        //         request,
        //         url,
        //         xx: {
        //           splitRequestUrl,
        //           getFileName,
        //           cacheStorage,
        //           cachedResponse,
        //         },
        //       });
        //       if (!cachedResponse) {
        //         console.warn("NAR: A new version of the app is available.");
        //       }
        //     }
        //     return url.origin === host;
        //   },
        //   handler: "StaleWhileRevalidate",
        //   // in case MFE => suppport only "NetworkFirst" & "StaleWhileRevalidate"
        //   options: {
        //     cacheName: "remoteMFE-angular-v2",
        //     expiration: {
        //       maxEntries: 1000,
        //       maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days,
        //     },
        //     cacheableResponse: {
        //       // ***REQUIRED*** or nothing is cached! => if "CacheFirst"
        //       statuses: [0, 200],
        //     },
        //   },
        // },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/public/images", to: "images" },
        { from: "./src/public/manifest", to: "manifest" },
      ],
    }),
    new Dotenv({ systemvars: true }),
  ],
});
