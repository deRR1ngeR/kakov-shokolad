import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CartModule } from '../cart/cart.module';
import { PrismaModule } from '@app/db';
import { OrderProductService } from './orderProduct.service';

@Module({
  imports: [PrismaModule, CartModule],
  controllers: [OrderController],
  providers: [OrderService, OrderProductService],
  exports: [OrderProductService],
})
export class OrderModule {}
