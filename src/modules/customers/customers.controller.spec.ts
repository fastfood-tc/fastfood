import { Test, TestingModule } from '@nestjs/testing';
import { CustomerControllerAdapter } from './adapters/in/customer.controller.adapter';
import { CustomerService } from './application/services/customer.service';

describe('CustomerControllerAdapter', () => {
  let controller: CustomerControllerAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerControllerAdapter],
      providers: [CustomerService],
    }).compile();

    controller = module.get<CustomerControllerAdapter>(CustomerControllerAdapter);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
