import { OrderStatus } from '../types/orders.types';

export class UpdateOrderStatusDto {
  id: string;
  status: OrderStatus;
}
