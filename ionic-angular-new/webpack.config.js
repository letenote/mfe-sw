// ::OPTION-1
// const { GenerateSW } = require("workbox-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const DefinePlugin = require("webpack/lib/DefinePlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "ionicAngularApp",
    publicPath: "auto",
    scriptType: "text/javascript",
    // path: path.resolve(__dirname, "./www"),
    // filename: (pathData) => {
    //   console.log("DEBBUG:BUILD", pathData);
    //   return pathData.chunk.name === "styles"
    //     ? "http://localhost:4200/[name].js"
    //     : "[name].js";
    // },
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "async",
          reuseExistingChunk: true,
        },
        common: {
          name: `chunk-common`,
          minChunks: 3,
          enforce: true,
          priority: -20,
          chunks: "async",
          reuseExistingChunk: true,
          test(module) {
            if (
              module.type === "provide-module" ||
              module.type === "consume-shared-module" ||
              module.type === "remote-module"
            ) {
              return false;
            }
            return true;
          },
        },
      },
    },
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  // experiments: {
  //   outputModule: true,
  // },
  plugins: [
    // new GenerateSW({
    //   // Configurations specific to your Module Federation setup
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   cacheId: "remoteMFE-angular-v1X",
    // }),
    new ModuleFederationPlugin({
      // library: { type: "module" },
      // runtime: "my-runtime-name",
      // For remotes (please adjust)
      name: "ionicAngularApp",
      filename: "remoteEntry.js",
      exposes: {
        "./button-ng": "./src/app/button-ng/button-ng.component.ts",
        "./component": "./src/app/app.component.ts",
        "./loadApp": "./src/loadApp.ts",
      },

      // For hosts (please adjust)
      remotes: {
        react_component: "react_component@http://localhost:3001/remoteEntry.js",
        expo_app: "expo_app@http://localhost:19006/remoteEntry.js",
        ionicAngularRemote:
          "ionicAngularRemote@http://localhost:4300/remoteEntry.js",
      },

      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        // "workbox-webpack-plugin": {
        //   singleton: true,
        //   requiredVersion: "your-workbox-version-1",
        // },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};

// ::OPTION-2
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const mf = require("@angular-architects/module-federation/webpack");
// const path = require("path");
// const share = mf.share;

// const sharedMappings = new mf.SharedMappings();
// sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
//   /* mapped paths to share */
// ]);

// module.exports = {
//   output: {
//     uniqueName: "ionicAngularApp",
//     publicPath: "auto",
//     scriptType: "text/javascript",
//   },
//   optimization: {
//     runtimeChunk: false,
//     splitChunks: {
//       cacheGroups: {
//         defaultVendors: {
//           name: `chunk-vendors`,
//           test: /[\\/]node_modules[\\/]/,
//           priority: -10,
//           chunks: "async",
//           reuseExistingChunk: true,
//         },
//         common: {
//           name: `chunk-common`,
//           minChunks: 3,
//           enforce: true,
//           priority: -20,
//           chunks: "async",
//           reuseExistingChunk: true,
//           test(module) {
//             if (
//               module.type === "provide-module" ||
//               module.type === "consume-shared-module" ||
//               module.type === "remote-module"
//             ) {
//               return false;
//             }
//             return true;
//           },
//         },
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       ...sharedMappings.getAliases(),
//     },
//   },
//   module: {
//     parser: {
//       javascript: {
//         dynamicImportMode: "eager",
//       },
//     },
//   },
//   // experiments: {
//   //   outputModule: true,
//   // },
//   plugins: [
//     new ModuleFederationPlugin({
//       // library: { type: "module" },

//       // For remotes (please adjust)
//       name: "ionicAngularApp",
//       filename: "remoteEntry.js",
//       exposes: {
//         "./button-ng": "./src/app/button-ng/button-ng.component.ts",
//         "./component": "./src/app/app.component.ts",
//         "./loadApp": "./src/loadApp.ts",
//       },

//       // For hosts (please adjust)
//       remotes: {
//         react_component: "react_component@http://localhost:3001/remoteEntry.js",
//         expo_app: "expo_app@http://localhost:19006/remoteEntry.js",
//       },

//       shared: share({
//         "@angular/core": {
//           eager: true,
//           singleton: true,
//           strictVersion: true,
//           requiredVersion: "auto",
//         },
//         "@angular/common": {
//           eager: true,
//           singleton: true,
//           strictVersion: true,
//           requiredVersion: "auto",
//         },
//         "@angular/common/http": {
//           eager: true,
//           singleton: true,
//           strictVersion: true,
//           requiredVersion: "auto",
//         },
//         "@angular/router": {
//           eager: true,
//           singleton: true,
//           strictVersion: true,
//           requiredVersion: "auto",
//         },

//         ...sharedMappings.getDescriptors(),
//       }),
//     }),
//     sharedMappings.getPlugin(),
//   ],
// };
