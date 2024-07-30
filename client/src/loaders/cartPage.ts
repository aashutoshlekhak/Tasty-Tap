import { Cart } from "../scripts/cart";

export class cartPage {
  static load = async () => {
    const response = await fetch("src/views/pages/user/cart.html");
    const markup = await response.text();
    return response.ok ? markup : "<p>Error loading carst page</p>";
  };

  static initEventListners = async () => {
    Cart.load();
  };
}
