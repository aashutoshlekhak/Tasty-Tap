import axios from "axios";
import { ICartMenu } from "../interface/menu.interface";
import { generateCartRow } from "../views/components/cartTableRow";
import { IRecipt } from "../interface/cart.interface";

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

    console.log(itemCountFields);

    itemCountFields.forEach((itemCount) => {
      itemCount.addEventListener("change", (e) => {
        console.log(itemCount.value);
      });
    });
  };
}
