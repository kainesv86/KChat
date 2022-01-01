import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/entities/user.repository';
import { RegisterAuthDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async registerUser(registerAuthDto: RegisterAuthDto): Promise<void> {
    const { username, password, email } = registerAuthDto;
    await this.userRepository.save({ username, password, email });
  }
}
