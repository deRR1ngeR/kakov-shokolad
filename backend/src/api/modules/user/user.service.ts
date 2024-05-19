import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './response/user-response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const isUserExist = await this.findUserByEmail(dto.email);
    if (isUserExist)
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.UNAUTHORIZED,
      );

    const salt = genSaltSync(10);

    const newUser: CreateUserDto = {
      ...dto,
      password: hashSync(dto.password, salt),
    };

    return await this.userRepository.create(newUser);
  }

  async findUserByEmailWithPassword(email: string): Promise<User> {
    return await this.userRepository.findByEmailWithPassword(email);
  }

  async findUserByEmail(email: string): Promise<UserResponse> {
    return await this.userRepository.findByEmail(email);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UserResponse> {
    return await this.userRepository.updateUser(id, data);
  }

  async updateUserPurchasedSets(id: number, value: number) {
    return await this.userRepository.updateUserPurchasedSets(id, value);
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async deleteUser(id: number): Promise<UserResponse[]> {
    return await this.userRepository.deleteUser(id);
  }

  async blockUser(id: number): Promise<UserResponse[]> {
    return await this.userRepository.blockUser(id);
  }
}
