import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { config } from './config';

const DBConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  port: config.DB_PORT,
  host: config.DB_HOST,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  keepConnectionAlive: true,
  entities: [],
});

@Module({
  imports: [
    // --- Config
    DBConfig,
    // --- Module
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
