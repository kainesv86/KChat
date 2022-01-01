import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/entities/user.repository';
import { RegisterAuthDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async encryptString(password: string): Promise<string> {
    return await bcrypt.hash(password, 5);
  }
}
