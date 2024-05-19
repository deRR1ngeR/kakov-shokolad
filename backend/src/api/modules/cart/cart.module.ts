import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartProductService } from './cartProduct.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '@app/db';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CartController],
  providers: [CartService, CartProductService],
  exports: [CartService],
})
export class CartModule {}
