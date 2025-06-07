import { Payment } from '../../domain/core/payment.entity';
import { CreatePaymentDto } from '../../application/dto/create-payment.dto';
import { PaymentStatus } from '../../domain/core/types/payment.types';

export const PAYMENT_REPOSITORY = 'PAYMENT_REPOSITORY';

export interface IPaymentRepository {
  create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
  findAll(): Promise<Payment[]>;
  findOne(id: string): Promise<Payment>;
  remove(id: string): Promise<Payment>;
  updateStatus(id: string, status: PaymentStatus): Promise<Payment>;
} 