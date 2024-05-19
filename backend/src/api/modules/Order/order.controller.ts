import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../auth/decorators/get.current.userId.decorator';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getUserOrders(@GetCurrentUserId(ParseIntPipe) id: number) {
    return await this.orderService.getOrders(id);
  }

  @Get('/all')
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    return await this.orderService.createOrder(body);
  }

  @Patch(':id')
  async blockOrder(@Param('id') id: number) {
    return await this.orderService.blockOrder(id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    return await this.orderService.deleteOrder(id);
  }
}
