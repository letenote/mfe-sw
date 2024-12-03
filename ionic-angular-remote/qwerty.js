const fs = require("fs").promises;

const readFiles = async ({
  parentPath = "./src/app/containers",
  importPath = "./containers",
} = {}) => {
  try {
    let routes = [];
    const parents = await fs.readdir(parentPath);
    for await (const parent of parents) {
      const parentContents = await fs.readdir(`${parentPath}/${parent}`);
      const getParent = parentContents.filter((child) =>
        child.includes(".module.ts")
      );
      const isParent = getParent.length > 0;
      if (isParent) {
        const readParentModuleFile = await fs.readFile(
          `${parentPath}/${parent}/${getParent[0]}`,
          "utf8"
        );
        const parentModuleContents = readParentModuleFile.split(" ");
        const getparentModuleName =
          parentModuleContents[parentModuleContents.indexOf("class") + 1];
        const getImportParentPath = `${importPath}/${parent}`;
        routes.push({
          path: parent,
          importPath: getImportParentPath,
          moduleName: getparentModuleName,
          moduleFile: getParent[0].replace(".ts", ""),
        });
      } else {
        for await (const child of parentContents) {
          const childContents = await fs.readdir(
            `${parentPath}/${parent}/${child}`
          );
          const getChild = childContents.filter((child) =>
            child.includes(".module.ts")
          );
          const isChild = getChild.length > 0;
          if (isChild) {
            const readChildModuleFile = await fs.readFile(
              `${parentPath}/${parent}/${child}/${getChild[0]}`,
              "utf8"
            );
            const childModuleContents = readChildModuleFile.split(" ");
            const getChildModuleName =
              childModuleContents[childModuleContents.indexOf("class") + 1];
            const getImportChildPath = `${importPath}/${parent}/${child}`;
            routes.push({
              path: parent,
              importPath: getImportChildPath,
              moduleName: getChildModuleName,
              moduleFile: getChild[0].replace(".ts", ""),
            });
          } else {
            /**
             * if any sub child
             * handle here ...
             */
          }
        }
      }
    }
    console.log("DEBUG =>", routes);
    // Generate the output file with the loadChildren function restored.
    let outputFileContent = `
      export default function() {
        return [${routes
          .map((route) => {
            return `{
          path: '${route.path}',
          importPath: '${route.importPath}',
          moduleName: '${route.moduleName}',
          loadChildren: () => import('${route.importPath}/${route.moduleFile}').then((m) => m.${route.moduleName})
        }`;
          })
          .join(",")}]
      }
    `;

    await fs.writeFile("./src/app/readFolders.ts", outputFileContent);
    console.log("Routes successfully written to ./src/app/readFolders.ts");
  } catch (error) {
    console.error("Error processing files:", error);
  }
};

readFiles();
