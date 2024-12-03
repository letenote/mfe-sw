import { Component } from "@angular/core";
import { RoutesProvider } from "./provider/RoutesProvider";
import MenuSidebarInterface from "./sidebar/sidebar.interrface";
import DummySidebarMenu from "./sidebar/sidebar.dummy";
// import allFolders from "./readFolders";
import { WebServiceWorker } from "src/services/WebServiceWorker.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  protected sidebarMenu: Array<MenuSidebarInterface> = DummySidebarMenu;
  protected openSidebarMenu: Array<string> = [];
  protected appIsReady: boolean = false;

  // ::sw-update
  isNewAppVersionAvailable: boolean = false;
  newAppUpdateAvailableSubscription!: Subscription;

  constructor(
    private routesProvider: RoutesProvider,
    private webServiceWorker: WebServiceWorker
  ) {}

  async ngOnInit() {
    console.log("DEBUG:ROUTES:BEFORE", this.routesProvider.getRoutes());
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await this.routesProvider.setRoutes({
      data: [
        {
          path: "home",
          loadChildren: () =>
            import("./home/home.module").then((m) => m["HomePageModule"]),
        },
      ],
    });

    await this.updateSidebar({
      data: { title: "Home", url: "/home", icon: "warning", child: [] },
    });
    console.log("DEBUG:ROUTES:AFTER", this.routesProvider.getRoutes());
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.setAppIsReady(true);

    // console.log("DEBUG:ROUTES:AFTER::REESULT", { allFolders: allFolders() });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.checkIfAppUpdated();
  }

  private async updateSidebar({
    data,
  }: {
    data: MenuSidebarInterface;
  }): Promise<{ message: string }> {
    this.sidebarMenu.push(data);
    return Promise.resolve({ message: "_SUCCESS" });
  }

  protected collapseSidebarMenuHandler(sidebarMenuTitle: string): void {
    !this.isOpenSidebarMenu(sidebarMenuTitle)
      ? this.openSidebarMenu.push(sidebarMenuTitle)
      : (this.openSidebarMenu = this.openSidebarMenu.filter(
          (title) => title !== sidebarMenuTitle
        ));
  }

  protected isOpenSidebarMenu(sidebarMenuTitle: string): boolean {
    if (window.innerWidth <= 990) return true;
    return this.openSidebarMenu.includes(sidebarMenuTitle);
  }

  protected getAppIsReady(): boolean {
    return this.appIsReady;
  }

  private setAppIsReady(val: boolean): void {
    this.appIsReady = val;
  }

  // ::sw-update
  checkIfAppUpdated() {
    this.newAppUpdateAvailableSubscription =
      this.webServiceWorker.$isAnyNewUpdateAvailable.subscribe(
        (versionAvailableFlag: boolean) => {
          this.isNewAppVersionAvailable = versionAvailableFlag;
          if (versionAvailableFlag) {
            let text =
              "A new version of the app is available. Please refresh your browser window or click OK button.";
            if (confirm(text) == true) return this.refreshApp();
          }
        }
      );
  }

  refreshApp() {
    window.location.reload();
  }

  ngOnDestroy() {
    this.newAppUpdateAvailableSubscription?.unsubscribe();
  }

  // changeRouteConfig() {
  //   this.getUrl().subscribe((data: Routes) => {
  //     // Updated routes
  //     console.log(data);
  //     this.routes = data;
  //     this.router.resetConfig(data);
  //   });
  // }

  // getUrl(): Observable<Routes> {
  //   return of([
  //     { path: "route-one", component: RouteOneComponent },
  //     { path: "route-two", component: RouteTwoComponent },
  //     { path: "route-three", component: RouteThreeComponent },
  //   ]);
  // }
}
