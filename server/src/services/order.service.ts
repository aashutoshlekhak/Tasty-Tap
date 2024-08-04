import { NotFoundError } from "../error/Errors";
import {
  delivery_status,
  IOrder,
  PaymentStatus,
} from "../interface/order.interface";
import * as OrderModel from "../models/order.model";

export async function createOrder(order: IOrder) {
  try {
    const createdOrder = await OrderModel.createOrder(order);
    return createdOrder;
  } catch (error) {
    throw new Error(`Error while creating order: ${error}`);
  }
}

export async function findOrderById(id: number) {
  try {
    const order = await OrderModel.findOrderById(id);
    if (!order) {
      throw new NotFoundError(`Order with id ${id} not found`);
    }
    return order;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new Error(`Error while finding order: ${error}`);
    }
  }
}

export async function getAllOrders() {
  try {
    const orders = await OrderModel.getAllOrders();
    if (!orders || orders.length === 0) {
      throw new NotFoundError("Orders not found");
    }
    return orders;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new Error(`Error while getting all orders: ${error}`);
    }
  }
}

export async function getOrdersByUserAddress(address: string) {
  try {
    const orders = await OrderModel.getOrdersByUserAddress(address);
    if (!orders) {
      throw new NotFoundError("No match results");
    }
    return orders;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new Error(`Error while getting orders by user address: ${error}`);
    }
  }
}

export async function getOrderByUsername(username: string) {
  try {
    const orders = await OrderModel.getOrderByUsername(username);
    if (!orders) {
      throw new NotFoundError("No match results");
    }
    return orders;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new Error(`Error while getting orders by username: ${error}`);
    }
  }
}

export async function getOrderByMenuName(menuName: string) {
  try {
    const orders = await OrderModel.getOrderByMenuName(menuName);
    if (!orders) {
      throw new NotFoundError("No match results");
    }
    return orders;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new Error(`Error while getting orders by menu name: ${error}`);
    }
  }
}

export async function searchOrder(searchParam: string) {
  try {
    const orders = await OrderModel.searchOrder(searchParam);
    if (!orders) {
      throw new NotFoundError("No match results");
    }

    return orders;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new Error(`Error while searching orders: ${error}`);
    }
  }
}

export async function deleteOrder(id: number) {
  try {
    await OrderModel.deleteOrder(id);
  } catch (error) {
    throw new Error(`Error while deleting order: ${error}`);
  }
}

export async function updateOrderPaymentStatus(
  id: number,
  paymentStatus: PaymentStatus
) {
  try {
    await OrderModel.updateOrderPaymentStatus(id, paymentStatus);
  } catch (error) {
    throw new Error(`Error while updating order payment status: ${error}`);
  }
}

export async function updateDeliveryStatus(
  id: number,
  deliveryStatus: delivery_status
) {
  try {
    await OrderModel.updateDeliveryStatus(id, deliveryStatus);
  } catch (error) {
    throw new Error(`Error while updating delivery status: ${error}`);
  }
}
