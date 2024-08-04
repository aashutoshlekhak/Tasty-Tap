import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../interface/auth.interface";
import * as OrderService from "../services/order.service";
import HttpStatusCodes from "http-status-codes";

export async function createOrder(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const orderBody = req.body;

    const user = req.user;

    const order = { ...orderBody, user_id: user.id };
    const createdOrder = await OrderService.createOrder(order);
    res.status(HttpStatusCodes.CREATED).json(createdOrder);
  } catch (error) {
    next(error);
  }
}

export async function findOrderById(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const order = await OrderService.findOrderById(id);
    res.status(HttpStatusCodes.OK).json(order);
  } catch (error) {
    next(error);
  }
}

export async function getAllOrders(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(HttpStatusCodes.OK).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getOrdersByUserAddress(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const address = req.body.address;
    const orders = await OrderService.getOrdersByUserAddress(address);
    res.status(HttpStatusCodes.OK).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getOrderByUsername(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const username = req.body.username;
    const orders = await OrderService.getOrderByUsername(username);
    res.status(HttpStatusCodes.OK).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function deleteOrder(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await OrderService.deleteOrder(id);
    res
      .status(HttpStatusCodes.OK)
      .json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function searchOrder(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const searchParam = req.body.searchParam;
    const orders = await OrderService.searchOrder(searchParam);
    res.status(HttpStatusCodes.OK).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function updateOrderPaymentStatus(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const paymentStatus = req.body.payment_status;
    const updatedOrder = await OrderService.updateOrderPaymentStatus(
      id,
      paymentStatus
    );
    res.status(HttpStatusCodes.OK).json(updatedOrder);
  } catch (error) {
    next(error);
  }
}

export async function updateOrderDeliveryStatus(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const deliveryStatus = req.body.delivery_status;
    const updatedOrder = await OrderService.updateDeliveryStatus(
      id,
      deliveryStatus
    );
    res.status(HttpStatusCodes.OK).json(updatedOrder);
  } catch (error) {
    next(error);
  }
}
