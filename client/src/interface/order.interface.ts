export interface IOrder {
  id?: number;
  product: string;
  quantity: number;
  delivery_status: delivery_status;
  payment_status: PaymentStatus;
  user: string;
  address: string;
}

export enum delivery_status {
  DELIVERED = "DELIVERED",
  PENDING = "PENDING",
  DISPATCHED = "DISPATCHED",
}

export enum PaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
}

interface IUser {
  username: string;
  address: string;
}

interface IMenuItem {
  name: string;
  image_url: string;
}

export interface IOrderAPIReponse {
  id: number;
  delivery_status: delivery_status;
  payment_status: PaymentStatus;
  quantity: number;
  user: IUser;
  menu_items: IMenuItem;
}
