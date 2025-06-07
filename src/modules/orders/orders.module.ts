import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/core/order.entity';
import { OrderService } from './application/services/order.service';
import { TypeOrmOrderRepositoryAdapter } from './adapters/out/typeorm-order.repository.adapter';
import { OrderControllerAdapter } from './adapters/in/order.controller.adapter';
import { ORDER_REPOSITORY } from './ports/out/order.repository.port';
import { CustomersModule } from '../customers/customers.module';
import { ProductsModule } from '../products/products.module';
import { OrderItemModule } from '../order-item/order-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    CustomersModule,
    ProductsModule,
    OrderItemModule,
  ],
  controllers: [OrderControllerAdapter],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: TypeOrmOrderRepositoryAdapter,
    },
  ],
  exports: [OrderService],
})
export class OrdersModule {}
