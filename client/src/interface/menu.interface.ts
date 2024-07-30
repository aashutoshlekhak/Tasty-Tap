export default interface IMenu {
  category: string;
  created_at: string;
  description: string;
  id: number;
  image_url: string;
  name: string;
  price: number;
  updated_at: string;
}

export interface ICartMenu {
  image_url: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  id: number;
}
