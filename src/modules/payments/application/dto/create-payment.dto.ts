import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  orderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
} 