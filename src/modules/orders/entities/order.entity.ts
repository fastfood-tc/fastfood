import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../types/orders.types';
import { OrderItem } from 'src/modules/order-item/entities/order-item.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';

export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @OneToMany(() => Customer, (customer) => customer.orders, { nullable: true })
  @ApiProperty({ required: false })
  customer?: Customer;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.RECEBIDO })
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  @ApiProperty({ type: () => [OrderItem] })
  items: OrderItem[];

  @UpdateDateColumn()
  updatedAt: Date;
}
