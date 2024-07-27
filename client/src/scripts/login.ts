import axios from "axios";
export class LoginForm {
  static load = async () => {
    const loginForm = document.getElementById("loginForm") as HTMLFormElement;
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = (document.getElementById("email") as HTMLInputElement)
        .value;
      const password = (document.getElementById("password") as HTMLInputElement)
        .value;
      console.log({
        email,
        password,
      });
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/login",
          {
            email,
            password,
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.token);

          window.location.hash = "#/admin/dashboard";
        }

        console.log(response.data);
      } catch (error: any) {
        // code below shows the error message right below the login form
        const passwordDiv = document.getElementById("login-password-div");
        passwordDiv?.classList.remove("mb-6");
        passwordDiv?.classList.add("mb-2");
        const loginErrorMessage = document.getElementById(
          "login-error-message"
        );
        loginErrorMessage!.style.display = "block";
        loginErrorMessage!.innerHTML = error.response.data.message;
        window.location.hash = "#/login";
      }
    });
  };
}
