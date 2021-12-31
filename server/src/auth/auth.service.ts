import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  async registerUser(registerAuthDto: RegisterAuthDto): Promise<void> {
    return null;
  }
}
