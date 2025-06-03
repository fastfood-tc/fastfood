/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const { cpf, email } = createCustomerDto;
      if (!cpf && !email) {
        throw new NotFoundException(
          'At least one field (cpf or email) must be provided.',
        );
      }
      const existingCustomer = await this.customerRepository.findOne({
        where: { cpf },
      });
      if (existingCustomer) {
        throw new ConflictException('Customer with this CPF already exists.');
      }
      const customer = this.customerRepository.create(createCustomerDto);
      return this.customerRepository.save(customer);
    } catch (error) {
      throw new InternalServerErrorException('Error creating customer', {
        description: error.message,
      });
    }
  }

  async findAll() {
    try {
      return await this.customerRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving customers', {
        description: error.message,
      });
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        throw new NotFoundException('Customer ID is required.');
      }
      const customer = await this.customerRepository.findOneBy({ id });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      return customer;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving customer', {
        description: error.message,
      });
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.findOne(id);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      Object.assign(customer, updateCustomerDto);
      return this.customerRepository.save(customer);
    } catch (error) {
      throw new InternalServerErrorException('Error updating customer', {
        description: error.message,
      });
    }
  }

  async remove(id: string) {
    try {
      const customer = await this.findOne(id);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      return this.customerRepository.remove(customer);
    } catch (error) {
      throw new InternalServerErrorException('Error removing customer', {
        description: error.message,
      });
    }
  }

  async findByEmail(email: string) {
    try {
      const customer = await this.customerRepository.findOneBy({ email });
      return customer;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving customer by email',
        {
          description: error.message,
        },
      );
    }
  }
}
