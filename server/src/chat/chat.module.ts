import { forwardRef, Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatRepository } from "./entities/chat.repository";

@Module({
        // imports: [forwardRef(() => AuthModule)],
        imports: [TypeOrmModule.forFeature([ChatRepository]), forwardRef(() => AuthModule)],
        providers: [ChatGateway, ChatService],
})
export class ChatModule {}
