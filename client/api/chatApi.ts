import { ServerResponse } from "../common/interface/api.interface";
import { RoomIdChatDto } from "../common/interface/chatLog.interface";
import http from "./axiosCommon";

export const chatApi = {
        joinChat: async (input: RoomIdChatDto) => {
                const url = `/chat/join`;
                const res = await http.put<ServerResponse<RoomIdChatDto>>(url, input);
                return res;
        },
};
