import express from "express";

import { authenticate } from "../middlewares/auth.middleware";
import {
  createReview,
  deleteReviewById,
  findReviewByMenuId,
} from "../controllers/review.controller";

const router = express();

router.post("/create", authenticate, createReview);
router.get("/find/", findReviewByMenuId);
router.delete("/delete/:id", authenticate, deleteReviewById);

export default router;
