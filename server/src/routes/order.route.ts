import express from "express";
import {
  createOrder,
  deleteOrder,
  findOrderById,
  getAllOrders,
  getOrderByUsername,
  getOrdersByUserAddress,
  searchOrder,
} from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express();

router.post("/create", authenticate, createOrder);
router.get("/find/:id", findOrderById);
router.get("/all", authenticate, getAllOrders);
router.get("/address", getOrdersByUserAddress);
router.get("/username", getOrderByUsername);
router.delete("/delete/:id", deleteOrder);
router.post("/search", searchOrder);

export default router;
