import { PrismaService } from '@app/db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CouponDto } from './dto/coupon.dto';

@Injectable()
export class CouponService {
  constructor(private readonly db: PrismaService) {}

  async createCoupon(data: CouponDto) {
    const coupon = await this.generateCoupon();
    console.log(data);
    await this.db.coupon.create({
      data: {
        code: coupon,
        isActive: true,
        numberOfActivations: 0,
        ...data,
      },
    });
  }

  async deleteCoupon(id: number) {
    try {
      const coupon = await this.getCouponById(id);
      if (coupon) {
        await this.db.coupon.delete({
          where: {
            id,
          },
        });
        return await this.getAllCoupons();
      } else throw new NotFoundException('Coupon not found');
    } catch (err) {
      throw new BadRequestException('Request failed');
    }
  }

  async getCouponByCode(code: string) {
    try {
      const coupon = await this.db.coupon.findUnique({
        where: {
          code,
        },
      });
      if (
        coupon &&
        coupon.isActive &&
        coupon.numberOfActivations < coupon.maxNumberOfActivations
      )
        return coupon;
      else throw new NotFoundException('Coupon not found');
    } catch (err) {
      throw new BadRequestException('Request failed');
    }
  }

  async getCouponById(id: number) {
    try {
      return await this.db.coupon.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new BadRequestException('Request failed');
    }
  }

  async getAllCoupons() {
    return await this.db.coupon.findMany();
  }

  async changeCouponStatus(id: number) {
    try {
      const coupon = await this.getCouponById(id);
      if (coupon) {
        await this.db.coupon.update({
          where: {
            id,
          },
          data: {
            isActive: !coupon.isActive,
          },
        });
        return await this.getAllCoupons();
      } else throw new NotFoundException('Coupon not found');
    } catch (err) {
      throw new BadRequestException('Request failed');
    }
  }

  async activateCoupon(code: string) {
    try {
      const coupon = await this.getCouponByCode(code);
      if (coupon) {
        await this.db.coupon.update({
          where: {
            code,
          },
          data: {
            numberOfActivations: coupon.numberOfActivations + 1,
          },
        });
        return await this.getAllCoupons();
      } else throw new NotFoundException('Coupon not found');
    } catch (err) {
      throw new BadRequestException('Request failed');
    }
  }

  async generateCoupon() {
    let coupon = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      coupon += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return coupon;
  }
}
