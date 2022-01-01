import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { RegisterAuthDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';

import { config } from '../config';
import { LoginAuthDto } from './dto/loginUser';
import { NotFoundError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async signUp(
    @Body() { username, email, password }: RegisterAuthDto,
    @Res() res: Response,
  ) {
    const isExist = await this.userService.findUserByUsername(username);

    if (isExist)
      throw new BadRequestException({
        error: { username: 'Username already exist' },
      });

    const newUser = new User();
    newUser.username = username;
    newUser.password = await this.authService.encryptString(password);
    newUser.email = email;
    const insertedUser = await this.userService.registerUser(newUser);
    const accessToken = await this.authService.createAccessToken(insertedUser);

    return res
      .cookie('access-token', accessToken, { maxAge: config.MAX_AGE })
      .send();
  }

  @Post('login')
  async signIn(
    @Body() { username, password }: LoginAuthDto,
    @Res() res: Response,
  ) {
    const isUserExist = await this.userService.findUserByUsername(username);

    if (!isUserExist)
      throw new BadRequestException({
        error: { errorMessage: 'Username or password are incorrect' },
      });

    const isCorrect = this.authService.decryptString(
      password,
      isUserExist.password,
    );

    if (!isCorrect)
      throw new BadRequestException({
        error: { errorMessage: 'Username or password are incorrect' },
      });

    const accessToken = await this.authService.createAccessToken(isUserExist);

    return res
      .cookie('access-token', accessToken, { maxAge: config.MAX_AGE })
      .send();
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
