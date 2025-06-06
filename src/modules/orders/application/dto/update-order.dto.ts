import { OrderStatus } from '../../domain/core/types/orders.types';

export class UpdateOrderStatusDto {
  id: string;
  status: OrderStatus;
}
