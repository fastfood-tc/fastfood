import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../../domain/core/order-item.entity';
import { IOrderItemRepository } from '../../ports/out/order-item.repository.port';

@Injectable()
export class TypeOrmOrderItemRepositoryAdapter implements IOrderItemRepository {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repository: Repository<OrderItem>,
  ) {}

  async create(orderItem: Partial<OrderItem>): Promise<OrderItem> {
    const newOrderItem = this.repository.create(orderItem);
    return this.repository.save(newOrderItem);
  }

  async save(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<OrderItem> {
    const orderItem = await this.repository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!orderItem)
      throw new NotFoundException(`Order item with ID ${id} not found`);
    return orderItem;
  }

  async update(id: string, orderItem: Partial<OrderItem>): Promise<OrderItem> {
    await this.repository.update(id, orderItem);
    return this.findOne(id);
  }

  async remove(id: string): Promise<OrderItem> {
    const orderItem = await this.findOne(id);
    return this.repository.remove(orderItem);
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    return this.repository.find({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
  }
}
