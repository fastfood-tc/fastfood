import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Customer } from 'src/modules/customers/domain/core/customer.entity';
import { OrderItem } from 'src/modules/order-item/domain/core/order-item.entity';
import { Order } from 'src/modules/orders/domain/core/order.entity';
import { Product } from 'src/modules/products/domain/core/product.entity';
import { Payment } from 'src/modules/payments/domain/core/payment.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5434', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      dropSchema: false,
      entities: [Customer, Order, Product, OrderItem, Payment],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      ssl:
        process.env.DB_SSL_ENABLED === 'true'
          ? {
              rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true',
              ca: process.env.DB_CA,
              key: process.env.DB_KEY,
              cert: process.env.DB_CERT,
            }
          : false,
      extra: {
        max: parseInt(process.env.DB_MAX_CONNECTIONS || '100', 10),
      },
    };
  }
}
