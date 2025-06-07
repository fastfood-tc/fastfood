import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../domain/core/customer.entity';
import { ICustomerRepository } from '../../ports/out/customer.repository.port';

@Injectable()
export class TypeOrmCustomerRepositoryAdapter implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async create(customer: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.repository.create(customer);
    return this.repository.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.repository.findOneBy({ id });
    if (!customer)
      throw new NotFoundException(`Customer with ID ${id} not found`);
    return customer;
  }

  async update(id: string, customer: Partial<Customer>): Promise<Customer> {
    await this.repository.update(id, customer);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Customer> {
    const customer = await this.findOne(id);
    return this.repository.remove(customer);
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.repository.findOneBy({ email });
    if (!customer)
      throw new NotFoundException(`Customer with email ${email} not found`);
    return customer;
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customer = await this.repository.findOneBy({ cpf });
    return customer;
  }
}
