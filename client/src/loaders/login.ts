export class login {
  static load = async () => {
    console.log("hello");
    const response = await fetch("src/views/pages/login.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading login";
  };
}
