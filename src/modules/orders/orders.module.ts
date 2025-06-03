import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CustomersModule } from '../customers/customers.module'; // Assuming you have a CustomerModule for customer-related logic
import { ProductsModule } from '../products/products.module';
import { OrderItemModule } from '../order-item/order-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    CustomersModule,
    ProductsModule,
    OrderItemModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
