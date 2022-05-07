import { Req, UseGuards } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";
import { Request } from "express";
import { Server } from "http";
import { UserGuard } from "src/auth/auth.guard";
import { UserSocketGuard } from "src/auth/authSocket.guard";
import { ChatService } from "./chat.service";
import { ChatLogDto } from "./dto/chat-logn.dto";

@WebSocketGateway({
        namespace: "chat",
        cors: {
                origin: ["https/localhost:3000"],
                credential: true,
        },
        allowEI03: true,
})
export class ChatGateway {
        constructor(private readonly chatService: ChatService) {}

        @WebSocketServer()
        server: Server;

        @UseGuards(UserSocketGuard)
        @SubscribeMessage("message")
        create(@MessageBody() chatLog: ChatLogDto, @Req() req: Request): void {
                console.log(chatLog);
                console.log(req.user);

                this.server.emit("message", chatLog);
        }

        // @SubscribeMessage("createChat")
        // create(@MessageBody() createChatDto: CreateChatDto) {
        //         return this.chatService.create(createChatDto);
        // }

        // @SubscribeMessage("findAllChat")
        // findAll() {
        //         return this.chatService.findAll();
        // }

        // @SubscribeMessage("findOneChat")
        // findOne(@MessageBody() id: number) {
        //         return this.chatService.findOne(id);
        // }

        // @SubscribeMessage("updateChat")
        // update(@MessageBody() updateChatDto: UpdateChatDto) {
        //         return this.chatService.update(updateChatDto.id, updateChatDto);
        // }

        // @SubscribeMessage("removeChat")
        // remove(@MessageBody() id: number) {
        //         return this.chatService.remove(id);
        // }
}
