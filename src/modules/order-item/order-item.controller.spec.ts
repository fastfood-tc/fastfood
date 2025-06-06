import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemControllerAdapter } from './adapters/in/order-item.controller.adapter';
import { OrderItemService } from './application/services/order-item.service';

describe('OrderItemController', () => {
  let controller: OrderItemControllerAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemControllerAdapter],
      providers: [OrderItemService],
    }).compile();

    controller = module.get<OrderItemControllerAdapter>(OrderItemControllerAdapter);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
