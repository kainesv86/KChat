import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { config } from '../config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: JwtService,
      useFactory: () => {
        return new JwtService({ secret: config.JWT_SECRET });
      },
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
