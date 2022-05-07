import * as React from "react";
import { Component } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AuthState } from "../common/interface/auth.dto";
import InputField from "../components/common/inputField";
import { RootState } from "../store";

interface ChatProps {}

const Chat: React.FunctionComponent<ChatProps> = () => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const [chat, setChat] = React.useState([
                { userId: "", message: "Hello, Kaine", createDate: "" },
                { userId: "", message: "Hi, Kaiser", createDate: "" },
        ]);

        const { register, handleSubmit } = useForm();
        return (
                <div className="flex flex-col justify-between flex-1 p-6 ">
                        <div>
                                {chat.map((item, index) => (
                                        <p className={`${authState.id === item.userId ? "text-right" : "text-left"}`} key={index}>
                                                {item.message}
                                        </p>
                                ))}
                        </div>
                        <InputField name="message" register={register} />
                </div>
        );
};

export default Chat;
