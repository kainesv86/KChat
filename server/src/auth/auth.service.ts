import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async encryptString(password: string): Promise<string> {
    return await bcrypt.hash(password, 5);
  }

  async createAccessToken(user: User): Promise<string> {
    return await this.jwtService.sign({
      username: user.username,
      id: user.id,
      email: user.email,
    });
  }
}
