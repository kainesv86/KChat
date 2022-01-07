import * as React from "react";
import { Component } from "react";

interface InputFieldProps {
        label: string;
        name: string;
        register?: any;
        type?: "password" | "text";
        error?: string;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({ label, register, type = "text", name, error }) => {
        return (
                <div className="group focus-within:text-gray-100 transform duration-300 mb-2 text-gray-800">
                        <div className="hover:bg-red-500/50 focus-within:bg-red-500/50  flex flex-col duration-300">
                                <div className="px-2 py-1">
                                        <label htmlFor={name} className="group-hover:text-gray-100 font-semibold text-base cursor-pointer w-full ">
                                                {label}
                                        </label>
                                </div>
                                <input
                                        id={name}
                                        type={type}
                                        className="w-full bg-amber-50 shadow-lg text-base outline-none px-2 py-1 text-gray-900 shadow-nier"
                                        {...register(name)}
                                />
                        </div>
                        {error ? <p className="text-red-500 font-semibold py-1 px-2 text-sm">{`${error}`}</p> : null}
                </div>
        );
};

export default InputField;
