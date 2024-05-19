import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../libs/db/prisma/prisma.module';
import { UserModule } from './api/modules/user/user.module';
import { ProductModule } from './api/modules/product/product.module';
import { CartModule } from './api/modules/cart/cart.module';
import { OrderModule } from './api/modules/Order/order.module';
import { CouponModule } from './api/modules/coupon/coupon.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    CouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
