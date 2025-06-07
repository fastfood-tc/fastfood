import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { WebhookPaymentDto } from '../dto/webhook-payment.dto';
import { Payment } from '../../domain/core/payment.entity';
import { IPaymentRepository, PAYMENT_REPOSITORY } from '../../ports/out/payment.repository.port';
import { PaymentStatus } from '../../domain/core/types/payment.types';
import { OrderService } from '../../../orders/application/services/order.service';
import { OrderStatus } from '../../../orders/domain/core/types/orders.types';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    private readonly orderService: OrderService,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    try {
      const { orderId } = dto;
      const order = await this.orderService.findOne(orderId);
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found.`);
      }
      const amount = order.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );
      return await this.paymentRepository.create({
        orderId: order.id,
        amount,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error creating payment', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error creating payment');
    }
  }

  async findAll(): Promise<Payment[]> {
    try {
      return await this.paymentRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching payments', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching payments');
    }
  }

  async findOne(id: string): Promise<Payment> {
    try {
      return await this.paymentRepository.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching payment', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching payment');
    }
  }

  async remove(id: string): Promise<Payment> {
    try {
      return await this.paymentRepository.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error removing payment', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error removing payment');
    }
  }

  async updateStatus(id: string, status: PaymentStatus): Promise<Payment> {
    try {
      return await this.paymentRepository.updateStatus(id, status);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error updating payment status', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error updating payment status');
    }
  }

  async webhook(dto: WebhookPaymentDto) {
    try {
      const { id, status } = dto;
      const payment = await this.paymentRepository.findOne(id);
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found.`);
      }
      if (payment.status === PaymentStatus.APPROVED) {
        const order = await this.orderService.findOne(payment.orderId);
        await this.orderService.updateStatus(order.id, { id: order.id, status: OrderStatus.PAGO });
      }
      if (status === PaymentStatus.FAILED) {
        await this.orderService.updateStatus(payment.orderId, { id: payment.orderId, status: OrderStatus.CANCELADO });
      }
      const orderUpdated = await this.orderService.findOne(payment.orderId);
      const paymentUpdated = await this.updateStatus(id, status);
      return {
        payment: paymentUpdated,
        order: { id: orderUpdated.id, status: orderUpdated.status },
        message: `Payment status updated to ${status}`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error processing webhook', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error processing webhook');
    }
  }
} 