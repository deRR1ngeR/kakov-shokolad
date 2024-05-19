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
import { CouponService } from './coupon.service';
import { CouponDto } from './dto/coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async createCoupon(@Body() data: CouponDto) {
    return await this.couponService.createCoupon(data);
  }

  @Delete(':id')
  async deleteCoupon(@Param('id', ParseIntPipe) id: number) {
    return await this.couponService.deleteCoupon(id);
  }
  @Get('/all')
  async getAllCoupons() {
    return await this.couponService.getAllCoupons();
  }

  @Get(':code')
  async getCouponByCode(@Param('code') code: string) {
    return await this.couponService.getCouponByCode(code);
  }

  @Patch('/activate/:code')
  async activateCoupon(@Param('code') code: string) {
    return await this.couponService.activateCoupon(code);
  }

  @Patch(':id')
  async changeCouponStatus(@Param('id', ParseIntPipe) id: number) {
    return await this.couponService.changeCouponStatus(id);
  }
}
