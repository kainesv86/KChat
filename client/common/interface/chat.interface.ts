export interface ChatLogProps {
        chatId: string;
        userId: string;
        message: string;
        createDate?: Date;
}

export interface RoomIdChatDto {
        chatId: string;
}

export enum ChatGatewayAction {
        CHAT_JOIN = "chat-join",
        CHAT_LEAVE = "chat-leave",
        CHAT_SEND = "chat-send",
        CHAT_GET = "chat-get",
}
