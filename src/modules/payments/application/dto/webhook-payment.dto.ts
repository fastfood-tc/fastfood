import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { PaymentStatus } from '../../domain/core/types/payment.types';

export class WebhookPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ enum: PaymentStatus })
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
} 