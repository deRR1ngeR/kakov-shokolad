import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';


export class PaginationDto {
    @ApiProperty({ required: true })
    @IsNumberString()
    page: string;

    @ApiProperty({ required: true })
    @IsNumberString()
    size: string;
}