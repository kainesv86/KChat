import { User } from "../model/user";

export interface ChatLogProps {
        chatId: string;
        user: User;
        message: string;
        createDate?: Date;
}

export interface ChatIdDto {
        chatId: string;
}

export enum ChatGatewayAction {
        CHAT_JOIN = "chat-join",
        CHAT_LEAVE = "chat-leave",
        CHAT_SEND = "chat-send",
        CHAT_GET = "chat-get",
}
