import IMenu from "../interface/menu.interface";
import { MenuCardScript } from "../scripts/menuCard";
import { MenuCard } from "../views/components/menuCard";
import { getMenuCardsData } from "../model/MenuData";

export class MenuPage {
  static load = async () => {
    const data = await getMenuCardsData();
    const cards = data.map((menu: IMenu) => MenuCard(menu));
    const markup = `
    <div class = " flex gap-3 flex-wrap  justify-center items-center">
    ${cards.join("")}
    </div>
    `;

    return markup;
  };

  static initEventListners = async () => {
    await MenuCardScript.load();
  };
}
