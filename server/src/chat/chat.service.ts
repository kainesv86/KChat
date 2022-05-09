import { Injectable } from "@nestjs/common";
import { Chat } from "./entities/chat.entity";
import { ChatRepository } from "./entities/chat.repository";

@Injectable()
export class ChatService {
        constructor(private readonly chatRepository: ChatRepository) {}
        async addChatMessage(newChatMessage: Chat): Promise<void> {
                await this.chatRepository.insert(newChatMessage);
        }

        async getAllChatMessageById(chatId: string): Promise<Chat[]> {
                const query = await this.chatRepository
                        .createQueryBuilder("chat")
                        .where("chat.chatId = :chatId", { chatId })
                        .leftJoinAndSelect("chat.user", "user");
                const result = await query.getMany();
                return result;
        }
}
