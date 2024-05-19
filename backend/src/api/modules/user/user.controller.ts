import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetCurrentUserId } from '../auth/decorators/get.current.userId.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  async updateUserPurchasedSets(@Query() query: UpdateUserDto) {
    return await this.userService.updateUserPurchasedSets(
      query.id,
      query.purchasedSets,
    );
  }

  @Get('getAll')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }

  @Patch('block/:id')
  async blockUser(@Param('id') id: number) {
    return await this.userService.blockUser(id);
  }

  @Get('getUser')
  public async getUser(@GetCurrentUserId(ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }
}
