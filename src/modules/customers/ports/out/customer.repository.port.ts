import { Customer } from '../../domain/core/customer.entity';

export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY';

export interface ICustomerRepository {
  create(customer: Partial<Customer>): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findOne(id: string): Promise<Customer>;
  update(id: string, customer: Partial<Customer>): Promise<Customer>;
  remove(id: string): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  findByCpf(cpf: string): Promise<Customer | null>;
}
