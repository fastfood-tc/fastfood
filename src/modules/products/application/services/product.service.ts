import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../../domain/core/product.entity';
import { IProductRepository, PRODUCT_REPOSITORY } from '../../ports/out/product.repository.port';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.create(createProductDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error creating product', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error creating product');
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching products', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching products');
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      return await this.productRepository.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching product', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching product');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      return await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error updating product', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error updating product');
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return await this.productRepository.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error removing product', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error removing product');
    }
  }
} 