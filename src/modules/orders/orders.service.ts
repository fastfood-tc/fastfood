/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entities/customer.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { OrderItemService } from '../order-item/order-item.service';
import { OrderStatus } from './types/orders.types';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customerService: CustomersService,
    private readonly orderItemService: OrderItemService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const { customerId, items } = createOrderDto;
      let customer: Customer | null;
      if (!customerId) {
        customer = await this.customerService.findByEmail(
          'visitante@example.com',
        );
      } else {
        customer = await this.customerService.findOne(customerId);
      }
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        const orderItem = await this.orderItemService.create({
          productId: item.productId,
          quantity: item.quantity,
        });
        orderItems.push(orderItem);
      }
      const order = this.orderRepository.create({
        customer,
        items: orderItems,
      });

      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Error creating order', {
        description: error.message,
      });
    }
  }

  async findAll() {
    try {
      return await this.orderRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching orders', {
        description: error.message,
      });
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['items', 'customer'],
        order: { createdAt: 'DESC' },
      });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching order', {
        description: error.message,
      });
    }
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const result = await this.orderRepository.delete(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error removing order', {
        description: error.message,
      });
    }
  }

  async updateStatus(id: string, status: OrderStatus) {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      order.status = status;
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Error updating order status', {
        description: error.message,
      });
    }
  }
}
