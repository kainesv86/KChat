import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { config } from "./config";
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { Relationship } from "./relationship/entities/relationship.entity";
import { RelationshipModule } from "./relationship/relationship.module";
import { ChatModule } from "./chat/chat.module";
import { Chat } from "./chat/entities/chat.entity";

const DBConfig = TypeOrmModule.forRoot({
        type: "mysql",
        port: config.DB_PORT,
        host: config.DB_HOST,
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        synchronize: true,
        keepConnectionAlive: true,
        entities: [User, Relationship, Chat],
});

@Module({
        imports: [
                // --- Config
                DBConfig,
                // --- Module
                AuthModule,
                UserModule,
                RelationshipModule,
                ChatModule,
        ],
        controllers: [AppController],
        providers: [AppService],
})
export class AppModule {}
