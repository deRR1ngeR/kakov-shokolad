import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../pagination/dto/pagination.dto';
import { SortType } from '../../../constants/sort';

export class QueryProductDto implements PaginationDto {

    @ApiProperty({ required: false })
    name: string;

    @ApiProperty({ required: false })
    price: number;

    @ApiProperty({ required: true })
    page: string;

    @ApiProperty({ required: false })
    size: string;

    @ApiProperty({ required: false })
    sortByPrice: SortType;

}