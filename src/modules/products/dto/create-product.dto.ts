import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../types/products.types';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsEnum(ProductCategory)
  @ApiProperty({ enum: ProductCategory })
  category: ProductCategory;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  image?: string;
}
