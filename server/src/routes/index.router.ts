import express from "express";
import { Router } from "express";
import userRouter from "./user.route";
import menuRouter from "./menu.route";

const router = Router();
router.use("/api/v1/users", userRouter);
router.use("/api/v1/menu", menuRouter);

export default router;
