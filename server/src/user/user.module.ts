import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./entities/user.repository";
import { AuthModule } from "src/auth/auth.module";
import { RelationshipModule } from "src/relationship/relationship.module";
import { ChatModule } from "src/chat/chat.module";

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository]), forwardRef(() => AuthModule), RelationshipModule, ChatModule],
        controllers: [UserController],
        providers: [UserService],
        exports: [UserService, TypeOrmModule],
})
export class UserModule {}
