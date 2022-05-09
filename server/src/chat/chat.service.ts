import { Injectable } from "@nestjs/common";
import { Chat } from "./entities/chat.entity";
import { ChatRepository } from "./entities/chat.repository";

@Injectable()
export class ChatService {
        constructor(private readonly chatRepository: ChatRepository) {}
        async createOnChateMessage(newChatMessage: Chat): Promise<void> {
                await this.chatRepository.insert(newChatMessage);
        }

        async getAllChatMessageById(chatId: string): Promise<Chat[]> {
                return await this.chatRepository.find({ chatId });
        }
        // findAll() {
        //         return `This action returns all chat`;
        // }
        // findOne(id: number) {
        //         return `This action returns a #${id} chat`;
        // }
        // update(id: number, updateChatDto: UpdateChatDto) {
        //         return `This action updates a #${id} chat`;
        // }
        // remove(id: number) {
        //         return `This action removes a #${id} chat`;
}
