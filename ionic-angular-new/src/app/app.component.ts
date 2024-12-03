import { Component } from "@angular/core";
import { WebServiceWorker } from "src/services/WebServiceWorker.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  // ::sw-update
  isNewAppVersionAvailable: boolean = false;
  newAppUpdateAvailableSubscription!: Subscription;
  public appPages = [
    { title: "Inbox", url: "/folder/inbox", icon: "mail" },
    { title: "Outbox", url: "/folder/outbox", icon: "paper-plane" },
    { title: "Favorites", url: "/folder/favorites", icon: "heart" },
    { title: "Archived", url: "/folder/archived", icon: "archive" },
    { title: "Trash", url: "/folder/trash", icon: "trash" },
    { title: "Spam", url: "/folder/spam", icon: "warning" },
  ];
  public labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];
  constructor(private webServiceWorker: WebServiceWorker) {}
  async ngOnInit() {
    console.log("SW-NG:1", { _this: this });
    this.checkIfAppUpdated();
  }
  // ::sw-update
  checkIfAppUpdated() {
    this.newAppUpdateAvailableSubscription =
      this.webServiceWorker.$isAnyNewUpdateAvailable.subscribe(
        (versionAvailableFlag: boolean) => {
          console.log("SW-NG:2", { _this: this, versionAvailableFlag });
          this.isNewAppVersionAvailable = versionAvailableFlag;
          if (versionAvailableFlag) {
            let text =
              "NA: A new version of the app is available. Please refresh your browser window or click OK button.";
            if (confirm(text) == true) return this.refreshApp();
          }
        }
      );
  }

  refreshApp() {
    window.location.reload();
  }
}
