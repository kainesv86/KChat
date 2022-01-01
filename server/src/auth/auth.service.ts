import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async encryptString(data: string): Promise<string> {
    return await bcrypt.hash(data, 5);
  }

  async createAccessToken(user: User): Promise<string> {
    return await this.jwtService.sign({
      username: user.username,
      id: user.id,
      email: user.email,
    });
  }

  async decryptString(data: string, encryptString: string): Promise<boolean> {
    return bcrypt.compare(data, encryptString);
  }
}
