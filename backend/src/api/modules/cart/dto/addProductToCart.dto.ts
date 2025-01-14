import { ApiProperty } from '@nestjs/swagger';

export class AddProductToCartDto {

    @ApiProperty()
    productId: number;

    @ApiProperty()
    count: number;

    @ApiProperty()
    description: string;
}