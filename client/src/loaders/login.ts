import { LoginForm } from "../scripts/login";

export class login {
  static load = async () => {
    const response = await fetch("src/views/pages/login.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading login";
  };

  static initEventListners = async () => {
    await LoginForm.load();
  };
}


