import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const accessToken = req.cookies['access-token'] || '';
    if (accessToken) {
      const user = await this.authService.getUserByAccessToken(accessToken);
      if (!user.id) {
        throw new UnauthorizedException('UnauthorizedException');
      } else req.user = user;
    }
    return true;
  }
}
