import {
  admin,
  analytics,
  customers,
  dashboard,
  menu,
  orders,
} from "./loaders/adminDashboard";
import { Homepage } from "./loaders/homepage";
import { login } from "./loaders/login";
import { notFound } from "./loaders/notFound";
import { signup } from "./loaders/signup";
import { userProfile } from "./loaders/user";

const routes: { [key: string]: { component: any } } = {
  "#/": { component: Homepage },
  "#/signup": { component: signup },
  "#/login": { component: login },
  "#/notFound": { component: notFound },
  "#/admin": { component: admin },
  "#/admin/dashboard": { component: dashboard },
  "#/admin/orders": { component: orders },
  "#/admin/menu": { component: menu },
  "#/admin/customers": { component: customers },
  "#/admin/analytics": { component: analytics },
  "#/user/me": { component: userProfile },
};

export class Router {
  static async loadContent() {
    console.log(localStorage);
    const hash = window.location.hash || "#/";
    const route = routes[hash] || routes["#/notFound"];
    if (route) {
      // to check if we are within admin dashboard context
      if (hash.startsWith("#/admin")) {
        const adminMarkup = await admin.load();
        document.getElementById("body")!.innerHTML = adminMarkup;

        const subRoute = routes[hash];

        if (subRoute) {
          const markup = await subRoute.component.load();
          document.getElementById("main-content")!.innerHTML = markup;
        } else {
          document.getElementById("main-content")!.innerHTML =
            await notFound.load();
        }
      } else {
        document.getElementById("body")!.innerHTML = "";
        const markup = await route.component.load();
        document.getElementById("body")!.innerHTML = markup;
        route.component.initEventListners();
      }
    }
  }

  static handleRouterChange() {
    Router.loadContent();
  }

  static init() {
    window.addEventListener("popstate", () => {
      this.handleRouterChange();
    });
    window.addEventListener("hashchange", () => {
      this.handleRouterChange();
    });
    this.handleRouterChange();
  }
}
