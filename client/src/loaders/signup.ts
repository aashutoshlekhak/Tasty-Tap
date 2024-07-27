import { SignupForm } from "../scripts/signup";

export class signup {
  static load = async () => {
    const response = await fetch("src/views/pages/signup.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading signup";
  };

  static initEventListners = () => {
    SignupForm.load();
  };
}
