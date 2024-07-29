export class MenuCardScript {
  static load = async () => {
    const addToCartButtons = document.querySelectorAll(".addToCart");
    const editMenuCardButtons = document.querySelectorAll(".editMenuCard");
    const deleteMenuCardButtons = document.querySelectorAll(".deleteMenuCard");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const target = e.target;
      });
    });

    editMenuCardButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const target = e.target as HTMLElement;
        const parent = target.closest("div");
        console.log(parent);
      });
    });
  };
}
