import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../libs/db/prisma/prisma.service';
import { Cart } from '@prisma/client';
import { CartProductService } from './cartProduct.service';
import { UserService } from '../user/user.service';
import { deleteProdcutFromCartDto } from './dto/deletProductFromCart.dto';
import { AddProductToCartDto } from './dto/addProductToCart.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly db: PrismaService,
    private readonly cartProductService: CartProductService,
    private readonly userService: UserService,
  ) {}

  async getCart(userId: number): Promise<Cart> {
    const cart = await this.db.cart.findUnique({
      where: { userId: +userId },
    });

    if (cart) {
      return cart;
    }
    return this.createCart(userId);
  }

  async createCart(userId: number): Promise<Cart> {
    return await this.db.cart.create({
      data: { userId: +userId },
    });
  }

  async addProduct(userId: number, dto: AddProductToCartDto) {
    const cart = await this.getCart(userId);
    const data = {
      cartId: cart.id,
      productId: dto.productId,
      count: +dto.count,
    };

    await this.cartProductService.addProductToCart(data.cartId, {
      productId: dto.productId,
      count: dto.count,
      description: dto.description,
    });
    const userCart = await this.cartProductService.getUserCart(cart.id);
    let purchasedSets = 0;
    userCart.map((el) => (purchasedSets += el.product.price * el.count));
    this.userService.updateUserPurchasedSets(userId, purchasedSets);
  }

  async getUserProducts(userId: number) {
    const cart = await this.getCart(userId);
    return await this.cartProductService.getUserCart(cart.id);
  }

  async deleteProduct({ userId, productId }: deleteProdcutFromCartDto) {
    const cart = await this.getCart(+userId);
    await this.cartProductService.deleteProduct(cart.id, +productId);
    const userCart = await this.cartProductService.getUserCart(cart.id);
    let purchasedSets = 0;
    userCart.map((el) => (purchasedSets += el.product.price * el.count));
    console.log(purchasedSets);
    this.userService.updateUserPurchasedSets(+userId, purchasedSets);
    return this.getUserProducts(+userId);
  }
}
