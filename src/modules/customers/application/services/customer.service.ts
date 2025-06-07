/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../../domain/core/customer.entity';
import {
  ICustomerRepository,
  CUSTOMER_REPOSITORY,
} from '../../ports/out/customer.repository.port';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const { cpf, email } = createCustomerDto;
      if (!cpf && !email) {
        throw new NotFoundException(
          'At least one field (cpf or email) must be provided.',
        );
      }

      if (cpf) {
        const existingCustomer = await this.customerRepository.findByCpf(cpf);
        if (existingCustomer) {
          throw new ConflictException('Customer with this CPF already exists.');
        }
      }

      return this.customerRepository.create(createCustomerDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating customer', {
        description: error.message,
      });
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving customers', {
        description: error.message,
      });
    }
  }

  async findOne(id: string): Promise<Customer> {
    try {
      if (!id) {
        throw new NotFoundException('Customer ID is required.');
      }
      const customer = await this.customerRepository.findOne(id);
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

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    try {
      const customer = await this.findOne(id);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      return this.customerRepository.update(id, updateCustomerDto);
    } catch (error) {
      throw new InternalServerErrorException('Error updating customer', {
        description: error.message,
      });
    }
  }

  async remove(id: string): Promise<Customer> {
    try {
      const customer = await this.findOne(id);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      return this.customerRepository.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Error removing customer', {
        description: error.message,
      });
    }
  }

  async findByEmail(email: string): Promise<Customer> {
    try {
      return await this.customerRepository.findByEmail(email);
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
