import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AuthState } from "../../common/interface/auth.dto";
import InputField from "../../components/common/inputField";
import { RootState } from "../../store";

import * as sockIo from "socket.io-client";
import { ChatLogDto } from "../../common/model/chatLog";
import { ChatGatewayAction, ChatLogProps } from "../../common/interface/chat.interface";
import { NextPage, NextPageContext } from "next";
import { Router } from "next/router";
import RouterProtection from "../../common/HOC/routerProtectionWrapper";
import { chatApi } from "../../api/chatApi";

interface ChatProps {
        chatId: string;
}

const Chat: NextPage<ChatProps> = ({ chatId }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const { register, handleSubmit } = useForm();
        const [chatLog, setChatLog] = React.useState<ChatLogProps[]>([]);

        const socket = sockIo.connect("http://localhost:4000/chat", {
                transports: ["websocket", "polling", "flashsocket"],
                withCredentials: true,
                path: "/socket.io",
        });

        React.useEffect(() => {
                if (chatId) {
                        socket.emit(ChatGatewayAction.CHAT_JOIN, { chatId });
                }
                return () => {
                        socket.emit(ChatGatewayAction.CHAT_LEAVE, { chatId });
                }; //Leave
        }, [chatId]);

        React.useEffect(() => {
                const getData = async () => {
                        if (chatId) {
                                const data = await chatApi.getChatHistory(chatId);
                                setChatLog(data);
                        }
                };
                getData();
        }, [chatId]);

        React.useEffect(() => {
                socket.on(ChatGatewayAction.CHAT_SEND, (data: ChatLogProps) => {
                        setChatLog((old) => [...old, data]);
                        console.log(data);
                        if (data && data.user) {
                                console.log(authState.id + " : " + data.user.id);
                        }
                });
        });

        const onSubmit = async (data: ChatLogDto) => {
                data.chatId = chatId;
                socket.emit(ChatGatewayAction.CHAT_SEND, data);
        };

        return (
                <RouterProtection>
                        <div className="flex flex-1 p-10">
                                <div className="flex flex-col justify-between flex-1 w-full p-6 sm:max-w-7xl shadow-nier">
                                        <div>
                                                {chatLog.map((item, index) => (
                                                        <p
                                                                className={`${
                                                                        item.user ? (authState.id === item.user.id ? "text-right" : "text-left") : ""
                                                                }`}
                                                                key={index}
                                                        >
                                                                {item.message}
                                                        </p>
                                                ))}
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                <InputField name="message" register={register} />
                                                <button className="">Submit</button>
                                        </form>
                                </div>
                        </div>
                </RouterProtection>
        );
};

Chat.getInitialProps = async (ctx: NextPageContext): Promise<ChatProps> => {
        let props = { chatId: ctx.query?.id || "" };
        return props as ChatProps;
};

export default Chat;
