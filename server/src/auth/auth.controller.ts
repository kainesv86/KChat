import {
  Controller,
  Post,
  Body,
  Res,
  BadRequestException,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { RegisterAuthDto, vRegisterAuthDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';

import { config } from '../config';
import { LoginAuthDto, vLoginAuthDto } from './dto/loginUser';
import { UserGuard } from './auth.guard';
import { JoiValidationPipe } from 'src/utils/validator/validator.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @UsePipes(new JoiValidationPipe(vRegisterAuthDto))
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
    // newUser.pendingAddFriends = new Array<string>();
    // newUser.friends = new Array<string>();
    const insertedUser = await this.userService.registerUser(newUser);
    const accessToken = await this.authService.createAccessToken(insertedUser);

    return res
      .cookie('access-token', accessToken, { maxAge: 60 * 60 * 1000 })
      .send();
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(vLoginAuthDto))
  async signIn(
    @Body() { username, password }: LoginAuthDto,
    @Res() res: Response,
  ) {
    const isUserExist = await this.userService.findUserByUsername(username);

    if (!isUserExist)
      throw new BadRequestException({
        error: { errorMessage: 'Username or password are incorrect' },
      });

    const isCorrect = await this.authService.decryptString(
      password,
      isUserExist.password,
    );

    if (!isCorrect)
      throw new BadRequestException({
        error: { errorMessage: 'Username or password are incorrect' },
      });

    const accessToken = await this.authService.createAccessToken(isUserExist);

    return res
      .cookie('access-token', accessToken, { maxAge: 60 * 60 * 1000 })
      .send();
  }

  @Post('/logout')
  @UseGuards(UserGuard)
  async logoutUser(@Req() req: Request, @Res() res: Response) {
    return res.cookie('access-token', '', { maxAge: -999 }).send();
  }
}
