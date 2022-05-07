import { forwardRef, Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { AuthModule } from "src/auth/auth.module";

@Module({
        imports: [forwardRef(() => AuthModule)],
        providers: [ChatGateway, ChatService],
})
export class ChatModule {}
