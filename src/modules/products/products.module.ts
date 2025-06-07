import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/core/product.entity';
import { ProductService } from './application/services/product.service';
import { ProductControllerAdapter } from './adapters/in/product.controller.adapter';
import { TypeOrmProductRepository } from './adapters/out/typeorm-product.repository';
import { PRODUCT_REPOSITORY } from './ports/out/product.repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductControllerAdapter],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: TypeOrmProductRepository,
    },
  ],
  exports: [ProductService],
})
export class ProductsModule {}
