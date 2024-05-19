import { ApiProperty } from '@nestjs/swagger';

export class AddProductToCartQuery {

    @ApiProperty({ required: true })
    userId: number;

    @ApiProperty({ required: true })
    productId: number;

}