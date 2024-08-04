import express from "express";
import { Router } from "express";
import userRouter from "./user.route";
import menuRouter from "./menu.route";
import orderRouter from "./order.route";
import reviewRouter from "./review.route";

const router = Router();
router.use("/api/v1/users", userRouter);
router.use("/api/v1/menu", menuRouter);
router.use("/api/v1/orders", orderRouter);
router.use("/api/v1/review", reviewRouter);

export default router;
