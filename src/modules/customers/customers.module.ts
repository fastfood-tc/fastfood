import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/core/customer.entity';
import { CustomerService } from './application/services/customer.service';
import { TypeOrmCustomerRepositoryAdapter } from './adapters/out/typeorm-customer.repository.adapter';
import { CustomerControllerAdapter } from './adapters/in/customer.controller.adapter';
import { CUSTOMER_REPOSITORY } from './ports/out/customer.repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerControllerAdapter],
  providers: [
    CustomerService,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: TypeOrmCustomerRepositoryAdapter,
    },
  ],
  exports: [CustomerService],
})
export class CustomersModule {}
