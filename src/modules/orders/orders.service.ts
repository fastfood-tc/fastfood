/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customerService: CustomersService, // Assuming you have a CustomerService to handle customer-related logic
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const customer = await this.customerService.findOne(
        createOrderDto.customerId,
      );
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      const order = this.orderRepository.create({
        ...createOrderDto,
        customer,
      });
      return this.orderRepository.save(order);
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
      const order = await this.orderRepository.findOne({ where: { id } });
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

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const result = await this.orderRepository.update(id, updateOrderDto);
      if (result.affected === 0) {
        throw new NotFoundException('Order not found');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error updating order', {
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
}
