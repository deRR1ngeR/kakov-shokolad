import { ApiProperty } from '@nestjs/swagger';

export class deleteProdcutFromCartDto {
    @ApiProperty()
    userId: number

    @ApiProperty()
    productId: number;
}