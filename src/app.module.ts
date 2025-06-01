import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import configuration from './config/configuration';
import { DatabaseModule } from './config/database/database.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath: `.env`,
      load: [configuration],
    }),
    DatabaseModule,
    CustomersModule,
    ProductsModule,
    OrdersModule,
    OrderItemModule,
  ],
})
export class AppModule {}
