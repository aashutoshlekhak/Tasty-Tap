import prisma from "../db/prisma.db";
import { IMenu } from "../interface/menu.interface";

export function createMenu(menu: IMenu) {
  const { name, description, price, category, image_url } = menu;
  return prisma.menu_items.create({
    data: {
      name,
      description,
      price,
      category,
      image_url,
    },
  });
}

export function findMenuById(id: number) {
  return prisma.menu_items.findUnique({ where: { id } });
}

export function findMenuByName(name: string) {
  return prisma.menu_items.findMany({ where: { name } });
}

export function getAllMenu() {
  return prisma.menu_items.findMany();
}

export function updateMenu(menu: IMenu, menuId: number) {
  const { name, description, price, category, image_url } = menu;
  return prisma.menu_items.update({
    where: { id: menuId },
    data: {
      name,
      description,
      price,
      category,
      image_url,
    },
  });
}

export function deleteMenu(id: number) {
  return prisma.menu_items.delete({ where: { id } });
}

export function findMenuByCategory(category: string) {
  return prisma.menu_items.findMany({ where: { category } });
}
