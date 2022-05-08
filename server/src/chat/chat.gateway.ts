import { Param, Req, UseGuards } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { Request } from "express";
import { Server } from "http";
import { SocketExtend } from "socket.io";
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
        @SubscribeMessage("message-in")
        create(@ConnectedSocket() client: SocketExtend, @MessageBody() chatLog: ChatLogDto): void {
                chatLog.userId = client.user.id;

                console.log(chatLog);
                client.to(chatLog.chatId).emit("message-in", chatLog);
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
