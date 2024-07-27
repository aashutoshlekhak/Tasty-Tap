export class Homepage {
  static async load() {
    const response = await fetch("src/views/pages/homepage.html");
    const markup = await response.text();
    return response.ok ? markup : "Error loading homepage";
  }
}
