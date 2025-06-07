import { Order } from '../../domain/core/order.entity';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface IOrderRepository {
  create(order: Partial<Order>): Promise<Order>;
  findAll(): Promise<Order[]>;
  findOne(id: string): Promise<Order>;
  update(id: string, order: Partial<Order>): Promise<Order>;
  remove(id: string): Promise<Order>;
  findByCustomerId(customerId: string): Promise<Order[]>;
} 