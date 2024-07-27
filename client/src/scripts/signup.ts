import axios from "axios";

export class SignupForm {
  static load = async () => {
    const signupForm = document.getElementById("signupForm") as HTMLFormElement;
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = (document.getElementById("username") as HTMLInputElement)
        .value;
      const email = (document.getElementById("email") as HTMLInputElement)
        .value;
      const password = (document.getElementById("password") as HTMLInputElement)
        .value;
      const fullName = (document.getElementById("fullName") as HTMLInputElement)
        .value;
      const profilePicture = (
        document.getElementById("profilePicture") as HTMLInputElement
      ).files?.[0];
      const address = (document.getElementById("address") as HTMLInputElement)
        .value;
      const contact = (document.getElementById("contact") as HTMLInputElement)
        .value;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("full_name", fullName);
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }
      formData.append("address", address);
      formData.append("contact", contact);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        if (response.status === 201) {
          window.location.hash = "#/login";
        }
      } catch (error: any) {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage!.style.display = "block";
        errorMessage!.innerHTML = error.response.data.message;
      }
    });
  };
}
