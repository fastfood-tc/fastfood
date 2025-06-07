import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../domain/core/order.entity';
import { IOrderRepository } from '../../ports/out/order.repository.port';

@Injectable()
export class TypeOrmOrderRepositoryAdapter implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.repository.create(order);
    return this.repository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.repository.findOne({
      where: { id },
      relations: ['customer', 'items'],
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    await this.repository.update(id, order);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Order> {
    const order = await this.findOne(id);
    return this.repository.remove(order);
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    return this.repository.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }
}
