//https://github.com/scerci/mfe-angular-react/tree/main
import "zone.js";
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { StandaloneComponent } from "./app/standalone/standalone.component";

if (environment.production) {
  enableProdMode();
}

const mount = () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
};

const mountStandalone = async ({ myvari }: any) => {
  var a = await bootstrapApplication(StandaloneComponent);
  (a.components[0].instance as StandaloneComponent).myvari = myvari;
  (a.components[0].instance as StandaloneComponent).cdRef.detectChanges();
  return a.components[0].instance as StandaloneComponent;
};

export { mount, mountStandalone };
