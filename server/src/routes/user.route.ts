import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

// const router = express();
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profile_picture",
      maxCount: 1,
    },
  ]),
  createUser
);

export default router;
