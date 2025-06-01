import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
