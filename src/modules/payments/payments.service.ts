/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payments.entity';
import { OrdersService } from '../orders/orders.service';
import { PaymentStatus } from './types/payments.types';
import { WebhookPaymentDto } from './dto/webhook-payment.dto';
import { OrderStatus } from '../orders/types/orders.types';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly orderService: OrdersService,
  ) {}

  async create(dto: CreatePaymentDto) {
    const { orderId } = dto;
    try {
      const order = await this.orderService.findOne(orderId);
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found.`);
      }
      const amount = order.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );
      const payment = this.paymentRepository.create({
        orderId: order.id,
        amount,
      });
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new InternalServerErrorException('Error creating payment', {
        description: error.message,
      });
    }
  }

  async findAll() {
    return await this.paymentRepository.find();
  }

  async findOne(id: string) {
    return await this.paymentRepository.findOneBy({ id });
  }

  async remove(id: string) {
    return await this.paymentRepository.delete(id);
  }

  async updateStatus(id: string, status: PaymentStatus) {
    try {
      const payment = await this.paymentRepository.findOneBy({ id });
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found.`);
      }
      payment.status = status;
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new InternalServerErrorException('Error updating payment status', {
        description: error.message,
      });
    }
  }

  async webhook(dto: WebhookPaymentDto) {
    try {
      const { id, status } = dto; // Assuming body contains an 'id' field
      const payment = await this.paymentRepository.findOneBy({ id });
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found.`);
      }
      const order = await this.orderService.findOne(payment.orderId);
      if (!order) {
        throw new NotFoundException(
          `Order with ID ${payment.orderId} not found.`,
        );
      }
      if (status === PaymentStatus.APPROVED) {
        await this.orderService.updateStatus(order.id, OrderStatus.RECEBIDO);
      }
      if (status === PaymentStatus.FAILED) {
        await this.orderService.updateStatus(order.id, OrderStatus.CANCELADO);
      }
      const orderUpdated = await this.orderService.findOne(order.id);
      const paymentUpdated = await this.updateStatus(id, status);
      return {
        payment: paymentUpdated,
        order: { id: orderUpdated.id, status: orderUpdated.status },
        message: `Payment status updated to ${status}`,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error processing webhook', {
        description: error.message,
      });
    }
  }
}
