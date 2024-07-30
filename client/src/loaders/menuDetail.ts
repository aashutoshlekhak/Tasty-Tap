import { getMenuCardData } from "../model/MenuData";
import { UpdateMenuForm } from "../scripts/menuEdit";
import updateMenuForm from "../views/components/menuUpdateForm";

export class MenuDetail {
  static load = async () => {
    const id = window.location.hash.split(":")[1];
    const menuData = await getMenuCardData(id);
    const markup = await updateMenuForm(menuData);
    return markup;
  };

  static initEventListners = async () => {
    await UpdateMenuForm.load();
  };
}
