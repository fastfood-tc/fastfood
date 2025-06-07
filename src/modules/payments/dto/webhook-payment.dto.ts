import { IsEnum, IsString } from 'class-validator';
import { PaymentStatus } from '../domain/core/types/payment.types';

export class WebhookPaymentDto {
  @IsString()
  id: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
