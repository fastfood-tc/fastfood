import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from '../../application/services/payment.service';
import { CreatePaymentDto } from '../../application/dto/create-payment.dto';
import { WebhookPaymentDto } from '../../application/dto/webhook-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentControllerAdapter {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }

  @Post('webhook')
  webhook(@Body() webhookPaymentDto: WebhookPaymentDto) {
    return this.paymentService.webhook(webhookPaymentDto);
  }
} 