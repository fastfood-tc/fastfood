import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from 'src/modules/order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  customerId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ApiProperty({ type: [CreateOrderItemDto] })
  items: CreateOrderItemDto[];
}
