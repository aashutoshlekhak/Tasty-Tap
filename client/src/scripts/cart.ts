import axios from "axios";
import { ICartMenu } from "../interface/menu.interface";
import { generateCartRow } from "../views/components/cartTableRow";

export class Cart {
  static updateUi = () => {};
  static load = async () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "{}");
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
    console.log("thsi is order info", orderInfo);
    const markUp = orderInfo.map((item) => {
      return generateCartRow(item);
    });

    console.log("this is markup", markUp);

    const markupBody = markUp.join("");

    cartBody.innerHTML = markupBody;
  };
}
