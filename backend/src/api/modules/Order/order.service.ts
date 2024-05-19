import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../libs/db/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from './orderProduct.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly db: PrismaService,
    private readonly orderProductService: OrderProductService,
    private readonly cartService: CartService,
  ) {}

  async getOrders(userId: number) {
    try {
      return await this.db.order.findMany({
        where: { userId: +userId },
        include: {
          product: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getAllOrders() {
    try {
      return await this.db.order.findMany({
        include: {
          user: {
            include: {
              orders: true,
            },
          },
          product: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async createOrder(body: CreateOrderDto) {
    try {
      await this.db.order
        .create({
          data: {
            deliveryMethod: body.deliveryMethod,
            adress: body.adress,
            totalAmount: body.totalAmount,
            comment: body.comment,
            dateOfOrder: body.dateOfOrder,
            userId: body.userId,
            creationDate: new Date(),
            orderStatus: false,
          },
          select: {
            id: true,
            userId: true,
            deliveryMethod: true,
            dateOfOrder: true,
            creationDate: true,
            comment: true,
            totalAmount: true,
            adress: true,
          },
        })
        .then((res) => {
          body.products.map((el) => {
            this.orderProductService.addProductsToOrder(res.id, el);
          });
        })
        .then(() => {
          body.products.map((el) =>
            this.cartService.deleteProduct({
              userId: body.userId,
              productId: el.productId,
            }),
          );
        });
    } catch (err) {
      throw new BadRequestException(err);
    }
    return;
  }

  async blockOrder(id: number) {
    try {
      const order = await this.db.order.findUnique({
        where: { id: +id },
      });

      await this.db.order.update({
        where: {
          id: +id,
        },
        data: {
          orderStatus: !order.orderStatus,
        },
      });
      return await this.getAllOrders();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteOrder(id: number) {
    try {
      await this.db.order.delete({
        where: {
          id: +id,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }

    return await this.getAllOrders();
  }
}
