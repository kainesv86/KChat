import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/entities/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async getUserByAccessToken(accessToken: string): Promise<User> {
    const { id } = this.verifyToken<User>(accessToken);
    return await this.userRepository.findOne({ id });
  }

  async createAccessToken(user: User): Promise<string> {
    return await this.jwtService.sign({
      username: user.username,
      id: user.id,
      email: user.email,
    });
  }

  verifyToken<T>(tokenData: string) {
    try {
      return this.jwtService.verify<any>(tokenData) as T;
    } catch (err) {
      return null;
    }
  }

  async encryptString(data: string): Promise<string> {
    return await bcrypt.hash(data, 5);
  }

  async decryptString(data: string, encryptString: string): Promise<boolean> {
    return bcrypt.compare(data, encryptString);
  }
}
