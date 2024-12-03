// ::OPTION-1
// const { GenerateSW } = require("workbox-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const DefinePlugin = require("webpack/lib/DefinePlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;
console.log("DEBUG:CONFIG:MODE");
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

// const fs = require("fs");
// fs.readdir("./src/app/containers", async (err, folders) => {
//   fs.writeFile(
//     "./src/app/readFolders.ts",
//     `export default function (): Array<string> {
//       return ${JSON.stringify(folders)};
//     }`,
//     (err) => err && console.log("Fail, read all containers")
//   );
// });

module.exports = {
  output: {
    uniqueName: "ionicAngularRemote",
    publicPath: "auto",
    scriptType: "text/javascript",
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
    // }),
    new ModuleFederationPlugin({
      // library: { type: "module" },

      // For remotes (please adjust)
      name: "ionicAngularRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./Customer": "./src/app/customer/customer.component.ts",
      },

      // For hosts (please adjust)
      remotes: {},

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
        //   requiredVersion: "^7.3.0",
        // },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
