import { App } from "viteTSRemote/App";

const AppViteReactTSModule = () => {
  console.log("MOUNT:CONTAINER:AppViteReactTSModule", {
    App,
    node: "version 23.2.0",
    react: "version 18.2.0",
    vite: "version 4.4.5",
  });
  return <App />;
};

export default AppViteReactTSModule;
