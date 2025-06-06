import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from '../../application/services/customer.service';
import { CreateCustomerDto } from '../../application/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../application/dto/update-customer.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('customers')
@ApiTags('Customers')
export class CustomerControllerAdapter {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({ status: 201, description: 'Customer created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'List of all customers.' })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer found.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
