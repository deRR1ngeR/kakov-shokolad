import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

type UserResponseType = Omit<User, 'password'> & Partial<Pick<User, 'password'>>

export class UserResponse implements UserResponseType {


    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    role: Role;

    @ApiProperty()
    isBlocked: boolean;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    purchasedSets: number;
}