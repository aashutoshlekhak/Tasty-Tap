export class notFound {
  static load = async () => {
    const response = await fetch("src/views/pages/notFound.html");
    const markup = await response.text();
    return response.ok ? markup : "<p>Page not found</p>";
  };
}

