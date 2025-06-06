import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from './types/orders.types';
import { OrderItem } from '../../../order-item/domain/core/order-item.entity';
import { Customer } from '../../../customers/domain/core/customer.entity';

export { OrderStatus };

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer?: Customer;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.AGUARDANDO_PAGAMENTO,
  })
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  @ApiProperty({ type: () => [OrderItem] })
  @JoinColumn({ name: 'order_items' })
  items: OrderItem[];

  @UpdateDateColumn()
  updatedAt: Date;
}
