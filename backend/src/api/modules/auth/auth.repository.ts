import { Injectable } from '@nestjs/common';

import { Role, User } from '@prisma/client';
import { PrismaService } from '@app/db';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/user-registration.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async foundUser(dto: LoginDto): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email: dto.email },
    });
  }

  public async createNewUser(
    dto: RegisterDto,
    hashedPassword: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        phoneNumber: dto.phoneNumber,
        isBlocked: false,
        role: Role.USER,
        purchasedSets: 0,
      },
    });
  }

  public async foundUserById(userId: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: +userId } });
  }
}
