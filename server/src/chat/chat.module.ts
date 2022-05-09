import { forwardRef, Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatRepository } from "./entities/chat.repository";
import { ChatController } from "./chat.controller";

@Module({
        imports: [TypeOrmModule.forFeature([ChatRepository]), forwardRef(() => AuthModule)],
        providers: [ChatGateway, ChatService],
        controllers: [ChatController],
})
export class ChatModule {}
