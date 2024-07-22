import { Router } from "express";
import express from "express";
import {
  createUser,
  findUserByEmail,
  login,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const router = express();

// const router = Router();
// router.route("/register").post(
//   upload.fields([
//     {
//       name: "profile_picture",
//       maxCount: 1,
//     },
//   ]),
//   createUser
// );

router.post(
  "/register",
  upload.fields([{ name: "profile_picture", maxCount: 1 }]),
  createUser
);

router.get("/findUser", findUserByEmail);

router.post("/login", login);

export default router;
