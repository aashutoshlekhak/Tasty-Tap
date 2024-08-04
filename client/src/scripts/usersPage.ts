import axios from "axios";
import { ICustomer } from "../interface/user.interface";
import {
  generateCustomerInfoRow,
  generateCustomerRow,
} from "../views/pages/admin/customersTableRow";

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
    const customerDetailsDiv = document.getElementById(
      "customer-detail-div"
    )! as HTMLElement;

    customersListBody.innerHTML = markup.join("");
    const customerDetailArr = document.querySelectorAll(".customer-details")!;
    customerDetailArr.forEach((customerDetail) => {
      customerDetail.addEventListener("click", async (e) => {
        const id = customerDetail.getAttribute("data-id")!;
        const customerApiRes = await axios.get(
          `http://localhost:3000/api/v1/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const customerDetailMarkup = generateCustomerInfoRow(
          customerApiRes.data
        );
        customerDetailsDiv.innerHTML = customerDetailMarkup;
        //to close the modal
        customerDetailsDiv.classList.replace("hidden", "block");
        const customerDetailModalCloseButton = document.getElementById(
          "close-user-modal"
        )! as HTMLElement;
        customerDetailModalCloseButton.addEventListener("click", () => {
          customerDetailsDiv.classList.replace("block", "hidden");
        });

        //to delete user
        const deleteUserButton = document.getElementById(
          "delete-user"
        )! as HTMLElement;
        deleteUserButton.addEventListener("click", async () => {
          const deleteResponse = await axios.delete(
            `http://localhost:3000/api/v1/users/deleteUser/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          if (deleteResponse.status === 200) {
            customerDetailsDiv.classList.replace("block", "hidden");
            window.location.reload();
          }
        });
      });
    });
  };
}
