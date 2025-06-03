import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsString()
  @ApiProperty()
  orderId: string;
}
