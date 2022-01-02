import * as React from "react";
import { Component } from "react";

interface InputFieldProps {
        label: string;
        name: string;
        register?: any;
        type?: "password" | "text";
}

const InputField: React.FunctionComponent<InputFieldProps> = ({ label, register, type = "text", name }) => {
        return (
                <div className="group hover:bg-red-500/50 focus-within:bg-red-500/50 focus-within:text-gray-100 transform duration-300 mb-2 text-gray-800">
                        <div className="px-2 py-1">
                                <label htmlFor={name} className="group-hover:text-gray-100 font-semibold text-base">
                                        {label}
                                </label>
                        </div>
                        <div className="flex">
                                <input
                                        id={name}
                                        type={type}
                                        className="w-full bg-amber-50 text-gra shadow-lg text-base outline-none px-2 py-1"
                                        {...register(name)}
                                />
                        </div>
                </div>
        );
};

export default InputField;
