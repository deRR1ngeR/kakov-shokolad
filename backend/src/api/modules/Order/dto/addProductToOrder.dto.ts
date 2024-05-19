import { ApiProperty } from '@nestjs/swagger';

export class AddProductToOrderDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  description: string;
}
