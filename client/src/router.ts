import { login } from "./loaders/login";

const routes: { [key: string]: { component: any } } = {
  "#/signup": { component: login },
  "#/login": { component: login },
};

export class Router {
  static async loadContent() {
    const hash = window.location.hash || "#/";
    const route = routes[hash];
    if (route) {
      document.getElementById("body")!.innerHTML = "";
      const markup = await route.component.load();
      document.getElementById("body")!.innerHTML = markup;
    }
  }

  static handleRouterChange() {
    Router.loadContent();
  }

  static init() {
    window.addEventListener("popstate", () => {
      this.handleRouterChange();
    });
    this.handleRouterChange();
  }
}
