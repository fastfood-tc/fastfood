import { OrderStatus } from '../types/orders.types';

export class ViewOrderDto {
  id: string;
  customer?: {
    name?: string;
  };
  status: OrderStatus;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
