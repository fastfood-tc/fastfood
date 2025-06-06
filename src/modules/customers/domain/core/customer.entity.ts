import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../../orders/domain/core/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @ApiProperty({ required: false })
  cpf?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  name?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  email?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
