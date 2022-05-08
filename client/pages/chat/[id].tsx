import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AuthState } from "../../common/interface/auth.dto";
import InputField from "../../components/common/inputField";
import { RootState } from "../../store";

import * as sockIo from "socket.io-client";
import { ChatLogDto } from "../../common/model/chatLog";
import { ChatLogProps } from "../../common/interface/chatLog.interface";
import { GetServerSidePropsContext, NextPage, NextPageContext } from "next";

interface ChatProps {
        id: string;
}

const Chat: NextPage<ChatProps> = ({ id }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const { register, handleSubmit } = useForm();
        const [chatLog, setChatLog] = React.useState<Array<ChatLogProps>>([
                { userId: "b51fa2a3-9072-4313-861b-459b85e14602", message: "Hello, Kaine", chatId: "" },
                { userId: "", message: "Hi, Kaiser", chatId: "" },
        ]);

        const socket = sockIo.connect("http://localhost:4000/chat", {
                transports: ["websocket", "polling", "flashsocket"],
                withCredentials: true,
                path: "/socket.io",
        });

        React.useEffect(() => {
                socket.on("message-in", (data: ChatLogProps) => {
                        data.chatId = id;
                        setChatLog([...chatLog, data]);
                });
        });

        const onSubmit = async (data: ChatLogDto) => {
                data.chatId = id;
                console.log(data);
                socket.emit("message-in", data);
        };

        return (
                <div className="flex flex-1 p-10">
                        <div className="flex flex-col justify-between flex-1 w-full p-6 sm:max-w-7xl shadow-nier">
                                <div>
                                        {chatLog.map((item, index) => (
                                                <p className={`${authState.id === item.userId ? "text-right" : "text-left"}`} key={index}>
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
        );
};

Chat.getInitialProps = async (ctx: NextPageContext): Promise<ChatProps> => {
        let props = { id: ctx.query?.id || "" };
        return props as ChatProps;
};

export default Chat;
