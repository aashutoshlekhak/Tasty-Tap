import { Router } from "express";
import express from "express";
import {
  createUser,
  deleteUser,
  deleteUserById,
  findUserByEmail,
  getAllUsers,
  getUserById,
  login,
  myProfile,
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
router.delete("/deleteUser/:id", authenticate, deleteUserById);
router.put(
  "/updateUser/:email",
  authenticate,
  upload.fields([{ name: "profile_picture", maxCount: 1 }]),
  updateUser
);
router.get("/all", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.get("/info", authenticate, myProfile);
export default router;
