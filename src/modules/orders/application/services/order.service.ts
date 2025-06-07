import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order.dto';
import { Order } from '../../domain/core/order.entity';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../../ports/out/order.repository.port';
import { CustomerService } from '../../../customers/application/services/customer.service';
import { OrderItemService } from '../../../order-item/application/services/order-item.service';
import { Customer } from '../../../customers/domain/core/customer.entity';
import { OrderItem } from '../../../order-item/domain/core/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly customerService: CustomerService,
    private readonly orderItemService: OrderItemService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const { customerId, items } = createOrderDto;
      let customer: Customer | null;
      if (!customerId) {
        customer = await this.customerService.findByEmail(
          'visitante@example.com',
        );
      } else {
        customer = await this.customerService.findOne(customerId);
      }
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        const orderItem = await this.orderItemService.create({
          productId: item.productId,
          quantity: item.quantity,
        });

        orderItems.push(orderItem);
      }

      return this.orderRepository.create({
        customer,
        items: orderItems,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error creating order', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error creating order');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching orders', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching orders');
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      return await this.orderRepository.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching order', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching order');
    }
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    try {
      await this.orderRepository.findOne(id);
      return this.orderRepository.update(id, {
        status: updateOrderStatusDto.status,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error updating order status', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error updating order status');
    }
  }

  async remove(id: string): Promise<Order> {
    try {
      await this.orderRepository.findOne(id);
      return this.orderRepository.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error removing order', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error removing order');
    }
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    try {
      return await this.orderRepository.findByCustomerId(customerId);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Error retrieving customer orders',
          {
            description: error.message,
          },
        );
      }
      throw new InternalServerErrorException(
        'Error retrieving customer orders',
      );
    }
  }
}
