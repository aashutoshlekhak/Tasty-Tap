import { NextFunction, Response } from "express";
import { AuthRequest } from "../interface/auth.interface";
import { IMenu } from "../interface/menu.interface";
import HttpStatusCodes from "http-status-codes";
import * as MenuService from "../services/menu.service";

export async function createMenu(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const menu = req.body;
    const localFilePath: any = req.files;
    menu.image_url = localFilePath.image_url[0].path;
    console.log(`controller menu`, menu);
    await MenuService.createMenu(menu);
    res
      .status(HttpStatusCodes.CREATED)
      .json({ message: "Menu created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getAllMenu(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const menu = await MenuService.getAllMenu();
    res.status(HttpStatusCodes.OK).json(menu);
  } catch (error) {
    next(error);
  }
}

export async function findMenuById(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const menu = await MenuService.findMenuById(id);
    res.status(HttpStatusCodes.OK).json(menu);
  } catch (error) {
    next(error);
  }
}

export async function deleteMenu(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await MenuService.deleteMenu(id);
    res
      .status(HttpStatusCodes.OK)
      .json({ message: "Menu deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function updateMenu(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const menu: IMenu = req.body;
    const localFilePath: any = req.files;
    menu.image_url = localFilePath.image_url[0].path;
    const id = parseInt(req.params.id);
    await MenuService.updateMenu(menu, id);
    res
      .status(HttpStatusCodes.OK)
      .json({ message: "Menu updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function findMenuByCategory(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const category = req.params.category;
    const menu = await MenuService.findMenuByCategory(category);
    res.status(HttpStatusCodes.OK).json(menu);
  } catch (error) {
    next(error);
  }
}

export async function findMenuByName(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const name = req.params.name;
    const menu = await MenuService.findMenuByName(name);
    res.status(HttpStatusCodes.OK).json(menu);
  } catch (error) {
    next(error);
  }
}
