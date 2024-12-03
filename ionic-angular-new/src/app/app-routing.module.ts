import { NgModule } from "@angular/core";
import {
  PreloadAllModules,
  Router,
  RouterModule,
  Routes,
} from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "customer",
    loadComponent: () =>
      import("ionicAngularRemote/Customer").then((m) => m.CustomerComponent),
  },
  {
    path: "notes",
    loadComponent: () =>
      import("./notes/notes.component").then((m) => m.NotesComponent),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    const x = localStorage.getItem("redirect");
    console.log("GET:STORRAGE:APPCOMPO:1", { val: x });
    routes[0].redirectTo = this.getPath(x);
  }

  getPath(val: string | null): string {
    switch (val) {
      case "/":
      case null:
        return "";
      default:
        return val;
    }
  }
}
