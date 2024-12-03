import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { loadRemoteModule } from "@angular-architects/module-federation";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

@Component({
  selector: "app-button-wrapper",
  template: "<div #buttonContainer></div>",
  styleUrls: ["./button-wrapper.component.scss"],
  standalone: true,
})
export class ButtonWrapperComponent implements AfterViewInit {
  @ViewChild("buttonContainer", { static: true }) buttonContainer!: ElementRef;

  async ngAfterViewInit() {
    // // ::react_component
    // const ButtonModule = await loadRemoteModule({
    //   remoteEntry: "http://localhost:3001/remoteEntry.js",
    //   remoteName: "react_component",
    //   exposedModule: "./Button",
    // });
    const ButtonModule = await loadRemoteModule({
      remoteEntry: "http://localhost:19006/remoteEntry.js",
      remoteName: "expo_app",
      exposedModule: "./Button",
    });
    const ReactButton = ButtonModule.default; // Assuming default export
    const reactElement = React.createElement(ReactButton, {
      title: "ClickMe:import:from:Expo",
    });
    const container = this.buttonContainer.nativeElement;
    const root = ReactDOM.createRoot(container);
    root.render(reactElement); // Render using 'createRoot'
  }
}
