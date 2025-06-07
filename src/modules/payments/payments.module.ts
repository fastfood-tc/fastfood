import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './domain/core/payment.entity';
import { PaymentService } from './application/services/payment.service';
import { PaymentControllerAdapter } from './adapters/in/payment.controller.adapter';
import { TypeOrmPaymentRepository } from './adapters/out/typeorm-payment.repository';
import { PAYMENT_REPOSITORY } from './ports/out/payment.repository.port';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), OrdersModule],
  controllers: [PaymentControllerAdapter],
  providers: [
    PaymentService,
    {
      provide: PAYMENT_REPOSITORY,
      useClass: TypeOrmPaymentRepository,
    },
  ],
  exports: [PaymentService],
})
export class PaymentsModule {}
