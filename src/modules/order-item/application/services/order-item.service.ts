/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../dto/update-order-item.dto';
import { OrderItem } from '../../domain/core/order-item.entity';
import {
  IOrderItemRepository,
  ORDER_ITEM_REPOSITORY,
} from '../../ports/out/order-item.repository.port';
import { ProductService } from 'src/modules/products/application/services/product.service';

@Injectable()
export class OrderItemService {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: IOrderItemRepository,
    private readonly productService: ProductService, // Assuming productService is defined elsewhere
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    try {
      const product = await this.productService.findOne(
        createOrderItemDto.productId,
      );
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      const order = await this.orderItemRepository.create({
        ...createOrderItemDto,
        product,
      });
      return await this.orderItemRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Error creating order item', {
        description: error.message,
      });
    }
  }

  async save(orderItem: OrderItem): Promise<OrderItem> {
    try {
      return await this.orderItemRepository.save(orderItem);
    } catch (error) {
      throw new InternalServerErrorException('Error saving order item', {
        description: error.message,
      });
    }
  }

  async findAll(): Promise<OrderItem[]> {
    try {
      return await this.orderItemRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving order items', {
        description: error.message,
      });
    }
  }

  async findOne(id: string): Promise<OrderItem> {
    try {
      if (!id) {
        throw new NotFoundException('Order item ID is required.');
      }
      return await this.orderItemRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving order item', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        description: error.message,
      });
    }
  }

  async update(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    try {
      const orderItem = await this.findOne(id);
      if (!orderItem) {
        throw new NotFoundException(`Order item with ID ${id} not found.`);
      }
      return this.orderItemRepository.update(id, updateOrderItemDto);
    } catch (error) {
      throw new InternalServerErrorException('Error updating order item', {
        description: error.message,
      });
    }
  }

  async remove(id: string): Promise<OrderItem> {
    try {
      const orderItem = await this.findOne(id);
      if (!orderItem) {
        throw new NotFoundException(`Order item with ID ${id} not found.`);
      }
      return this.orderItemRepository.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Error removing order item', {
        description: error.message,
      });
    }
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    try {
      return await this.orderItemRepository.findByOrderId(orderId);
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving order items', {
        description: error.message,
      });
    }
  }
}
