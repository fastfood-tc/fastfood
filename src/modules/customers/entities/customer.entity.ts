import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => Order, (order) => order.customer, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  orders?: Order[];
}
