import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;
}
