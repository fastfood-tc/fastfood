import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './domain/core/order-item.entity';
import { OrderItemService } from './application/services/order-item.service';
import { TypeOrmOrderItemRepositoryAdapter } from './adapters/out/typeorm-order-item.repository.adapter';
import { OrderItemControllerAdapter } from './adapters/in/order-item.controller.adapter';
import { ORDER_ITEM_REPOSITORY } from './ports/out/order-item.repository.port';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    ProductsModule,
  ],
  controllers: [OrderItemControllerAdapter],
  providers: [
    OrderItemService,
    {
      provide: ORDER_ITEM_REPOSITORY,
      useClass: TypeOrmOrderItemRepositoryAdapter,
    },
  ],
  exports: [OrderItemService],
})
export class OrderItemModule {}
