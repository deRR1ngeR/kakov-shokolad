import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddProductToCartQuery } from './dto/addProductToCart.query';
import { deleteProdcutFromCartDto } from './dto/deletProductFromCart.dto';
import { AddProductToCartDto } from './dto/addProductToCart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,) { }

    @Get(':id')
    async getCart(@Param('id') id: string) {
        return await this.cartService.getUserProducts(+id);
    }

    @Post()
    @HttpCode(201)
    async addProductToCart(@Query() { id }: any, @Body() data: AddProductToCartDto) {
        return await this.cartService.addProduct(+id, data);
    }

    @Delete()
    @HttpCode(200)
    async deleteProduct(@Query() { userId, productId }: deleteProdcutFromCartDto) {
        return await this.cartService.deleteProduct({ userId: +userId, productId: +productId });
    }
}