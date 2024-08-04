import axios from "axios";
import { ICustomer } from "../interface/user.interface";
import { generateCustomerRow } from "../views/pages/admin/customersTableRow";

export class AdminUsers {
  static load = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = response.data;
    const markup = data.map((user: ICustomer) => generateCustomerRow(user));
    const customersListBody = document.getElementById(
      "admin-orders"
    )! as HTMLElement;

    customersListBody.innerHTML = markup.join("");

    const customerDetailArr =document.querySelectorAll(".customer-details")!;

    customerDetailArr.forEach((customerDetail) => {
        customerDetail.addEventListener("click", (e) => {
          const id = customerDetail.getAttribute("data-id")!;
          console.log(id);
        })
    })




  };



}
