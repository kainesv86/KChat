import { UseGuards } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { SocketExtend, Server } from "socket.io";
import { UserSocketGuard } from "src/auth/authSocket.guard";
import { ChatService } from "./chat.service";
import { ChatLogDto } from "./dto/chat-logn.dto";
import { ChatIdDto } from "./dto/roomIdDto";
import { Chat } from "./entities/chat.entity";
import { ChatGatewayAction } from "./entities/chat.enum";

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
        @SubscribeMessage(ChatGatewayAction.CHAT_SEND)
        async handleSendChatMessage(@ConnectedSocket() client: SocketExtend, @MessageBody() chatLog: ChatLogDto): Promise<void> {
                chatLog.userId = client.user.id;
                chatLog.createDate = new Date();

                const newChat = new Chat();
                newChat.chatId = chatLog.chatId;
                newChat.createDate = chatLog.createDate;
                newChat.message = chatLog.message;
                newChat.user = client.user;

                await this.chatService.addChatMessage(newChat);

                this.server.to(chatLog.chatId).emit(ChatGatewayAction.CHAT_SEND, newChat);
        }

        @SubscribeMessage(ChatGatewayAction.CHAT_JOIN)
        handleJoinSocket(@ConnectedSocket() client: SocketExtend, @MessageBody() chatIdDto: ChatIdDto): void {
                console.log("Join: " + chatIdDto.chatId);
                client.join(chatIdDto.chatId);
        }

        @SubscribeMessage(ChatGatewayAction.CHAT_LEAVE)
        handleLeaveSocket(@ConnectedSocket() client: SocketExtend, @MessageBody() chatIdDto: ChatIdDto): void {
                console.log("Leave: " + chatIdDto.chatId);
                console.log("=======================================================");
                client.leave(chatIdDto.chatId);
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
