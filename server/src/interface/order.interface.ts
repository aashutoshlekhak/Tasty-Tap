export interface IOrder {
  id?: number;
  user_id: number;
  menu_id: number;
  payment_status?: PaymentStatus;
  delivery_status?: delivery_status;
  quantity?: number;
}

export enum PaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
}

export enum delivery_status {
  DELIVERED = "DELIVERED",
  PENDING = "PENDING",
  DISPATCHED = "DISPATCHED",
}
