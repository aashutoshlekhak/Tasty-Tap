import axios from "axios";
import config from "../config";
export class Analytics {
  static load = async () => {
    const inputElement = document.getElementById("review") as HTMLInputElement;
    const submitButton = document.getElementById("submit") as HTMLButtonElement;
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const review = inputElement.value;
      const allReview = {
        review: review,
        menu_id: 12,
      };
      console.log(allReview);

      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/review/create`,
          allReview,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    });
  };
}
