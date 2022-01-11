import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { monoLogger } from 'mono-utils-core';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(UserGuard)
  getUser(@Req() req: Request) {
    return req.user;
  }

  @Post('/addfriend')
  @UseGuards(UserGuard)
  addFriend(@Req() req: Request, @Body() friendRequestDto: FriendRequestDto) {
    return this.userService.addFriendByUsername(req.user, friendRequestDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
