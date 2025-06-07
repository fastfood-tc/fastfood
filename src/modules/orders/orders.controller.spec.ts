import { Test, TestingModule } from '@nestjs/testing';
import { OrderControllerAdapter } from './adapters/in/order.controller.adapter';
import { OrderService } from './application/services/order.service';

describe('OrderControllerAdapter', () => {
  let controller: OrderControllerAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderControllerAdapter],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderControllerAdapter>(OrderControllerAdapter);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
