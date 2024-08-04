import { Analytics } from "../scripts/analytics";
import { AdminOrders } from "../scripts/orderPage";
import { AdminUsers } from "../scripts/usersPage";

export class admin {
  static load = async () => {
    const response = await fetch("src/views/pages/admin/adminPortal.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading admin dashboard";
  };
}

export class dashboard {
  static load = async () => {
    const response = await fetch("src/views/pages/admin/dashboard.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading dashboard";
  };
}

export class orders {
  static load = async () => {
    const response = await fetch("src/views/pages/admin/orders.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading orders";
  };

  static initEventListners = async () => {
    AdminOrders.load();
  };
}

export class menu {
  static load = async () => {
    const response = await fetch("src/views/pages/admin/menu.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading menu";
  };
}

export class customers {
  static load = async () => {
    const response = await fetch("src/views/pages/admin/customers.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading customers";
  };

  static initEventListners = async () => {
    AdminUsers.load();
  };
}

export class analytics {
  static load = async () => {
    const response = await fetch("src/views/pages/admin/analytics.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading analytics";
  };

  static initEventListners = async () => {
    Analytics.load();
  };
}
