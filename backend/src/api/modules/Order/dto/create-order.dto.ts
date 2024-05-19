import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsString } from 'class-validator';
import { AddProductToOrderDto } from './addProductToOrder.dto';

export class CreateOrderDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  dateOfOrder: Date;

  @ApiProperty()
  deliveryMethod: $Enums.DeliveryMethod;

  @ApiProperty()
  @IsString()
  adress?: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  @IsString()
  comment?: string;

  @ApiProperty()
  products: AddProductToOrderDto[];
}
