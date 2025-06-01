import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../types/products.types';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column('decimal')
  @ApiProperty()
  price: number;

  @Column({ type: 'enum', enum: ProductCategory })
  @ApiProperty({ enum: ProductCategory })
  category: ProductCategory;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  image?: string;
}
