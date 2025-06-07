import { OrderItem } from '../../domain/core/order-item.entity';

export const ORDER_ITEM_REPOSITORY = 'ORDER_ITEM_REPOSITORY';

export interface IOrderItemRepository {
  create(orderItem: Partial<OrderItem>): Promise<OrderItem>;
  findAll(): Promise<OrderItem[]>;
  findOne(id: string): Promise<OrderItem>;
  update(id: string, orderItem: Partial<OrderItem>): Promise<OrderItem>;
  remove(id: string): Promise<OrderItem>;
  findByOrderId(orderId: string): Promise<OrderItem[]>;
  save(orderItem: OrderItem): Promise<OrderItem>;
}
