import { ChatLogProps } from "../common/interface/chat.interface";
import { ChatLogDto } from "../common/model/chatLog";
import http from "./axiosCommon";

export const chatApi = {
        getChatHistory: async (chatId: string) => {
                const url = `/chat/${chatId}`;
                const res = await http.get<ChatLogProps[]>(url);
                return res.data;
        },
};
