import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { PrismaModule } from '@app/db';

@Module({
  imports: [PrismaModule],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
