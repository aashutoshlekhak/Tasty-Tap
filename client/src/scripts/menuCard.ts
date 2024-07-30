import axios from "axios";
import config from "../config";

export class MenuCardScript {
  static load = async () => {
    let orders: { [key: string]: any } = {};
    localStorage.setItem("orders", JSON.stringify(orders));

    const addToCartButtons = document.querySelectorAll(".addToCart");
    const editMenuCardButtons = document.querySelectorAll(".editMenuCard");
    const deleteMenuCardButtons = document.querySelectorAll(".deleteMenuCard");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const cartCountDiv = document.getElementById(
          "cart-count"
        )! as HTMLElement;
        cartCountDiv.classList.replace("hidden", "flex");

        const target = e.target as HTMLElement;
        const parent = target.closest("div[data-id]");
        const id = parent!.getAttribute("data-id")!;
        const orders = localStorage.getItem("orders")!;
        const ordersList = JSON.parse(orders);
        if (id in ordersList) {
          ordersList[id] += 1;
        } else {
          ordersList[id] = 1;
        }
        localStorage.setItem("orders", JSON.stringify(ordersList));
        console.log(ordersList);
        console.log(localStorage.getItem("orders"));

        let totalOrders = 0;
        for (const key in ordersList) {
          totalOrders += ordersList[key];
        }
        cartCountDiv.innerHTML = totalOrders.toString();
      });
    });

    deleteMenuCardButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const target = e.target as HTMLElement;
        const id = target.getAttribute("data-id");
        console.log(id);
        const response = await axios.delete(
          `${config.BASE_URL}/menu/deleteMenu/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response);
        window.location.pathname = "";
      });
    });

    editMenuCardButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const target = e.target as HTMLElement;
        const parent = target.closest("div");
        console.log(parent);
      });
    });
  };
}
