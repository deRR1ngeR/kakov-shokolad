import { Injectable } from '@nestjs/common';

import { Role, User } from '@prisma/client';

import { PrismaService } from '../../../../libs/db/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './response/user-response';

@Injectable()
export class UserRepository {
  constructor(private readonly db: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserResponse> {
    return this.db.user.create({
      data: {
        ...dto,
        role: Role.USER,
        isBlocked: false,
        purchasedSets: 0,
      },
      select: {
        id: true,
        email: true,
        name: true,
        purchasedSets: true,
        isBlocked: true,
        role: true,
        phoneNumber: true,
      },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findByEmail(email: string): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UserResponse> {
    return await this.db.user.update({
      where: {
        id: +id,
      },
      data: {
        ...data,
      },
    });
  }

  async updateUserPurchasedSets(
    id: number,
    value: number,
  ): Promise<UserResponse> {
    return await this.db.user.update({
      where: {
        id: +id,
      },
      data: {
        purchasedSets: value,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        id: +id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.db.user.findMany({});
  }

  async deleteUser(id: number): Promise<UserResponse[]> {
    await this.db.user.delete({
      where: {
        id: +id,
      },
    });
    return this.findAll();
  }

  async blockUser(id: number): Promise<UserResponse[]> {
    const user = await this.findById(id);

    await this.db.user.update({
      where: {
        id: +id,
      },
      data: {
        isBlocked: !user.isBlocked,
      },
    });
    return this.findAll();
  }
}
