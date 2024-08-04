import axios from "axios";
import { ICartMenu } from "../interface/menu.interface";
import { generateCartRow } from "../views/components/cartTableRow";
import { IRecipt } from "../interface/cart.interface";
import { menu } from "../loaders/adminDashboard";

export class Cart {
  static loadLocalStorage() {
    const orders = JSON.parse(localStorage.getItem("orders") || "{}");
    return orders;
  }

  static updateUi = (recipt: IRecipt) => {
    // Recipt section
    const subtotal = document.getElementById("subtotal") as HTMLElement;
    const deliveryFee = document.getElementById("delivery-fee") as HTMLElement;
    const vatPrice = document.getElementById("vat-price") as HTMLElement;
    const total = document.getElementById("total-price") as HTMLElement;
    subtotal.innerHTML = recipt.subtotal.toString();
    deliveryFee.innerHTML = recipt.deliveryFee.toString();
    vatPrice.innerHTML = recipt.vat.toString();
    total.innerHTML = recipt.total.toString();
  };

  static load = async () => {
    const orders = this.loadLocalStorage();
    const recipt = {
      subtotal: 0,
      deliveryFee: 200,
      vat: 0,
      total: 200,
    };
    const cartBody = document.getElementById("carts-body") as HTMLElement;
    const orderInfo = [];
    for (const key in orders) {
      const order = await axios.get(
        `http://localhost:3000/api/v1/menu/findMenuById/${key}`
      );
      const cartInfo: ICartMenu = {
        image_url: order.data.image_url,
        name: order.data.name,
        price: order.data.price,
        quantity: orders[key],
        total: order.data.price * orders[key],
        id: order.data.id,
      };
      orderInfo.push(cartInfo);
    }

    const markUp = orderInfo.map((item) => {
      return generateCartRow(item);
    });

    recipt.subtotal = orderInfo
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
    recipt.vat = recipt.subtotal * 0.1;
    recipt.total = recipt.subtotal + recipt.vat + recipt.deliveryFee;

    const markupBody = markUp.join("");
    this.updateUi(recipt);
    cartBody.innerHTML = markupBody;

    //to detect change in a cart count field whent the value is changed
    const itemCountFields = document.querySelectorAll(
      ".menu-item-count"
    )! as NodeListOf<HTMLInputElement>;

    itemCountFields.forEach((itemCount) => {
      itemCount.addEventListener("change", (e) => {
        const element = e.target as HTMLInputElement;
        if (parseInt(element.value) <= 0) {
          element.value = "0";
        }
        const id = element.getAttribute("data-id")!;
        const orders = this.loadLocalStorage();
        console.log(orders);
        orders[id] = parseInt(element.value);
        localStorage.setItem("orders", JSON.stringify(orders));
        this.load();
      });
    });

    //delete all the items from the cart
    const deleteCartButton = document.getElementById(
      "delete-cart-button"
    )! as HTMLElement;

    const handleDeleteCart = (e: Event) => {
      console.log("hello");
      localStorage.removeItem("orders");
      this.load();
    };
    //checkout the items fromt the page
    const checkOutButton = document.getElementById(
      "checkout-button"
    )! as HTMLElement;
    const handleCheckout = async (e: Event) => {
      console.log(e);
      const orders = this.loadLocalStorage();
      for (const key in orders) {
        await axios.post(
          `http://localhost:3000/api/v1/orders/create`,
          {
            menu_id: parseInt(key),
            quantity: orders[key],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      }
      localStorage.removeItem("orders");
      window.location.reload();
    };

    checkOutButton.removeEventListener("click", handleCheckout);
    deleteCartButton.removeEventListener("click", handleDeleteCart);
    deleteCartButton.addEventListener("click", handleDeleteCart);
    checkOutButton.addEventListener("click", handleCheckout);
  };
}
