import * as React from "react";
import { Component } from "react";

interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
        return (
                <div>
                        <ul className="flex flex-col bg-red-400 p-4 h-full">
                                <li className="w-16 h-16 bg-blue-400">Hi</li>
                                <li>Hi</li>
                                <li>Hi</li>
                        </ul>
                </div>
        );
};

export default SideBar;
