import express from "express";

import { authenticate } from "../middlewares/auth.middleware";
import {
  createMenu,
  deleteMenu,
  findMenuByCategory,
  findMenuById,
  findMenuByName,
  getAllMenu,
  updateMenu,
} from "../controllers/menu.controller";

import { upload } from "../middlewares/multer.middleware";

const router = express();

router.post(
  "/createMenu",
  upload.fields([{ name: "image_url", maxCount: 1 }]),
  authenticate,
  createMenu
);
router.get("/getAllMenu", getAllMenu);
router.get("/findMenuById/:id", findMenuById);
router.get("/findMenuByCategory/:category", findMenuByCategory);
router.get("/findMenuByName/:name", findMenuByName);
router.delete("/deleteMenu/:id", authenticate, deleteMenu);
router.put(
  "/updateMenu/:id",
  upload.fields([{ name: "image_url", maxCount: 1 }]),
  authenticate,
  updateMenu
);

export default router;
