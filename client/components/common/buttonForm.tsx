import * as React from "react";
import { Component } from "react";

interface ButtonFormProps {
        label: string;
        name: string;
        type: "button" | "submit";
        className?: string;
}

const ButtonForm: React.FunctionComponent<ButtonFormProps> = ({ label, name, type = "submit", className }) => {
        return (
                <button
                        className={`hover:bg-red-600/50 w-full block py-1 font-semibold hover:text-gray-100 duration-300 shadow-nier ${className}`}
                        key={name}
                        type={type}
                >
                        {label}
                </button>
        );
};

export default ButtonForm;
