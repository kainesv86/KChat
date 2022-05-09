import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { UserGuard } from "src/auth/auth.guard";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
        constructor(private readonly chatService: ChatService) {}
        @Get("/:chatId")
        @UseGuards(UserGuard)
        async getChat(@Param("chatId") chatId: string) {
                return await this.chatService.getAllChatMessageById(chatId);
        }
}
