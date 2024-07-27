import express from "express";

import { authenticate } from "../middlewares/auth.middleware";
import {
  createMenu,
  deleteMenu,
  findMenuById,
  getAllMenu,
  updateMenu,
} from "../controllers/menu.controller";
import { findMenuByCategory, findMenuByName } from "../models/menu.model";
import { upload } from "../middlewares/multer.middleware";

const router = express();

router.post(
  "/createMenu",
  upload.fields([{ name: "image_url", maxCount: 1 }]),
  createMenu
);
router.get("/getAllMenu", getAllMenu);
router.get("/findMenuById/:id", findMenuById);
router.get("/findMenuByCategory/:category", findMenuByCategory);
router.get("/findMenuByName/:name", findMenuByName);
router.delete("/deleteMenu/:id", deleteMenu);
router.put("/updateMenu/:id", updateMenu);

export default router;
