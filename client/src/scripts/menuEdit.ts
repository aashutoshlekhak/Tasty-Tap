import axios from "axios";

export class UpdateMenuForm {
  static load = async () => {
    const updateMenuForm = document.getElementById(
      "updateMenuForm"
    ) as HTMLFormElement;
    updateMenuForm.addEventListener("submit", async (event) => {
      console.log("clicked");
      event.preventDefault();
      const id = window.location.hash.split(":")[1];

      const formData = new FormData();
      const menuName = (document.getElementById("name") as HTMLInputElement)
        .value;
      const menuDescription = (
        document.getElementById("description") as HTMLInputElement
      ).value;
      const menuPrice = (document.getElementById("price") as HTMLInputElement)
        .value;
      const menuImage = (document.getElementById("image") as HTMLInputElement)
        .files?.[0];
      const menuCategory = (
        document.getElementById("category") as HTMLInputElement
      ).value;

      formData.append("name", menuName);
      formData.append("description", menuDescription);
      formData.append("price", menuPrice);
      formData.append("category", menuCategory);

      if (menuImage) {
        formData.append("image_url", menuImage);
      }
      try {
        const formDataObject: { [key: string]: any } = {};
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });

        console.log(formDataObject);
        const response = await axios.put(
          "http://localhost:3000/api/v1/menu/updateMenu/" + id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }

        );
        console.log(response.data);
        if (response.status === 200) {
          window.location.hash = "";
          window.location.hash = "#/menu";
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
}
