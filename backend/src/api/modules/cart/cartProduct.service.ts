import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../libs/db/prisma/prisma.service';
import { AddProductToCartDto } from './dto/addProductToCart.dto';

@Injectable()
export class CartProductService {
  constructor(private readonly db: PrismaService) {}

  async addProductToCart(
    cartId: number,
    { productId, count, description }: AddProductToCartDto,
  ) {
    try {
      return await this.db.cartProduct.upsert({
        where: { cartId_productId: { cartId, productId } },
        create: {
          cartId: +cartId,
          productId: +productId,
          count: +count,
          description,
        },
        update: {
          count: +count,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getUserCart(cartId: number) {
    return await this.db.cartProduct.findMany({
      where: { cartId: +cartId },
      include: {
        product: true,
      },
    });
  }

  async deleteProduct(cartId: number, productId: number) {
    return await this.db.cartProduct.delete({
      where: { cartId_productId: { cartId: +cartId, productId: +productId } },
    });
  }
}
