import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly productService: ProductsService, // Assuming you have a ProductService to handle product-related logic
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto) {
    const product = await this.productService.findOne(
      createOrderItemDto.productId,
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const orderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      product,
    });
    return this.orderItemRepository.save(orderItem);
  }

  findAll() {
    return this.orderItemRepository.find();
  }

  findOne(id: string) {
    return this.orderItemRepository.findOne({ where: { id } });
  }

  update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemRepository.update(id, updateOrderItemDto);
  }

  remove(id: string) {
    return this.orderItemRepository.delete(id);
  }
}
