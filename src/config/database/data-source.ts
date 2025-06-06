import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { Customer } from 'src/modules/customers/domain/core/customer.entity';
import { Order } from 'src/modules/orders/domain/core/order.entity';
import { OrderItem } from 'src/modules/order-item/domain/core/order-item.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Payment } from 'src/modules/payments/entities/payments.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5434,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [Customer, Order, Product, OrderItem, Payment],
migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',

    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
