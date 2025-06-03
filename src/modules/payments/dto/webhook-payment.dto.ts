import { IsEnum, IsString } from 'class-validator';
import { PaymentStatus } from '../types/payments.types';

export class WebhookPaymentDto {
  @IsString()
  id: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
