import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';


import { IsEmail, IsString } from 'class-validator';

type CreateUserType = Omit<User, 'id' | 'role' | 'isBlocked' | 'purchasedSets'>;

export class CreateUserDto implements CreateUserType {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phoneNumber: string;
}