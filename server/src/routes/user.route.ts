import { Router } from "express";
import express from "express";
import {
  createUser,
  deleteUser,
  findUserByEmail,
  login,
  updateUser,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = express();

router.post(
  "/register",
  upload.fields([{ name: "profile_picture", maxCount: 1 }]),
  createUser
);

router.get("/findUser", authenticate, findUserByEmail);

router.post("/login", login);

router.delete("/deleteUser", authenticate, deleteUser);

router.put("/updateUser", authenticate, updateUser);

export default router;
