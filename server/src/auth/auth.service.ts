import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async registerUser(): Promise<void> {
    console.log('Hello');
  }
}
