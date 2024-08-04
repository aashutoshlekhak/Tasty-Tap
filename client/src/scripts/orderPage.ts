import axios from "axios";
import {
  delivery_status,
  IOrder,
  IOrderAPIReponse,
} from "../interface/order.interface";
import { generateOrderRow } from "../views/pages/admin/ordersTableRow";

export class AdminOrders {
  static load = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/orders/all",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    const ordersArr = data.map((order: IOrderAPIReponse) => {
      return {
        id: order.id,
        product: order.menu_items.name,
        quantity: order.quantity,
        delivery_status: order.delivery_status,
        payment_status: order.payment_status,
        user: order.user.username,
        address: order.user.address,
      };
    });
    const markup = ordersArr.map((order: IOrder) => generateOrderRow(order));
    const orderBody = document.getElementById("admin-orders") as HTMLElement;
    orderBody.innerHTML = markup.join("");
  };
}
