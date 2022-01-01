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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { RegisterAuthDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';

import { config } from '../config';
import { LoginAuthDto } from './dto/loginUser';
import { UserGuard } from './auth.guard';

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

  @Post('/logout')
  @UseGuards(UserGuard)
  async logoutUser(@Req() req: Request, @Res() res: Response) {
    return res.cookie('access-token', '', { maxAge: -999 }).send();
  }
}
