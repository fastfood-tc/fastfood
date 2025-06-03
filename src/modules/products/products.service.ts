/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './types/products.types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product', {
        description: error.message,
      });
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching products', {
        description: error.message,
      });
    }
  }

  async findByCategory(category: ProductCategory) {
    try {
      return await this.productRepository.find({
        where: { category },
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching products by category',
        {
          description: error.message,
        },
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.productRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching product', {
        description: error.message,
      });
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.productRepository.update(id, updateProductDto);
      return await this.productRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException('Error updating product', {
        description: error.message,
      });
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);
      if (product) {
        await this.productRepository.remove(product);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error removing product', {
        description: error.message,
      });
    }
  }

  async findByIds(productIds: string[]) {
    if (!productIds || productIds.length === 0) {
      throw new InternalServerErrorException('Product IDs are required');
    }
    if (productIds.length > 100) {
      throw new InternalServerErrorException('Too many product IDs provided');
    }
    try {
      return await this.productRepository.find({
        where: { id: In(productIds) },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching products by IDs', {
        description: error.message,
      });
    }
  }
}
