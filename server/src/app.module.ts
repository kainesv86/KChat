import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { config } from './config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Relationship } from './relationship/entities/relationship.entity';
import { RelationshipModule } from './relationship/relationship.module';

const DBConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  port: config.DB_PORT,
  host: config.DB_HOST,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  keepConnectionAlive: true,
  entities: [User, Relationship],
});

@Module({
  imports: [
    // --- Config
    DBConfig,
    // --- Module
    AuthModule,
    UserModule,
    RelationshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
