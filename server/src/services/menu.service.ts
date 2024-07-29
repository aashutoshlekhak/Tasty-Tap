import { NotFoundError } from "../error/Errors";
import { IMenu } from "../interface/menu.interface";
import * as MenuModel from "../models/menu.model";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";

export async function createMenu(menu: IMenu) {
  try {
    const response = await uploadOnCloudinary(menu.image_url);
    const price = parseFloat(menu.price.toString());
    await MenuModel.createMenu({
      ...menu,
      image_url: response!.secure_url,
      price: price,
    });
  } catch (error) {
    throw new Error(`Error while creating menu: ${error}`);
  }
}

export async function getAllMenu() {
  const menu = await MenuModel.getAllMenu();
  if (!menu) {
    throw new NotFoundError("Menu not found");
  }
  return menu;
}

export async function findMenuById(id: number) {
  const menu = await MenuModel.findMenuById(id);
  if (!menu) {
    throw new NotFoundError(`Menu with id ${id} not found`);
  }
  return menu;
}

export async function deleteMenu(id: number) {
  try {
    await MenuModel.deleteMenu(id);
  } catch (error) {
    throw new Error(`Error while deleting menu: ${error}`);
  }
}

export async function updateMenu(menu: IMenu, menuId: number) {
  try {
    const response = await uploadOnCloudinary(menu.image_url);
    const price = parseFloat(menu.price.toString());
    await MenuModel.updateMenu(
      { ...menu, price, image_url: response!.secure_url },
      menuId
    );
  } catch (error) {
    throw new Error(`Error while updating menu: ${error}`);
  }
}

export async function findMenuByCategory(category: string) {
  const menu = await MenuModel.findMenuByCategory(category);
  if (!menu) {
    throw new NotFoundError(`Menu with category ${category} not found`);
  }
  return menu;
}

export async function findMenuByName(name: string) {
  const menu = await MenuModel.findMenuByName(name);
  if (!menu) {
    throw new NotFoundError(`Menu with name ${name} not found`);
  }
  return menu;
}
