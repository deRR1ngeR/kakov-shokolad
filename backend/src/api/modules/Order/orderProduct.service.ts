import { PrismaService } from '@app/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AddProductToOrderDto } from './dto/addProductToOrder.dto';

@Injectable()
export class OrderProductService {
  constructor(private readonly db: PrismaService) {}

  async getUserOrder(orderId: number) {
    return await this.db.orderProduct.findMany({
      where: { orderId: +orderId },
      include: {
        product: true,
      },
    });
  }

  async addProductsToOrder(
    orderId: number,
    { productId, count, description }: AddProductToOrderDto,
  ) {
    try {
      return await this.db.orderProduct.create({
        data: {
          orderId: +orderId,
          productId: +productId,
          count: +count,
          description,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async isProductAlreadyInOrder(productId: number) {
    return await this.db.orderProduct.findFirst({
      where: {
        productId: +productId,
      },
    });
  }
}
