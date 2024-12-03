import { Injectable } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { routes } from "../app-routing.module";

@Injectable({
  providedIn: "root",
})
export class RoutesProvider {
  private routes: Routes = routes;
  constructor(private router: Router) {}

  public getRoutes(): Routes {
    return this.routes;
  }

  public async setRoutes({
    data,
  }: {
    data: Routes;
  }): Promise<{ message: string }> {
    const _merge: Routes = [...this.routes, ...data];
    this.routes = _merge;
    this.router.resetConfig(_merge);
    return Promise.resolve({ message: "_SUCCESS" });
  }
}
