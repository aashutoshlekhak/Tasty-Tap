export class Header {
  static load = async () => {
    const response = await fetch("src/views/components/header.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading header";
  };
}
