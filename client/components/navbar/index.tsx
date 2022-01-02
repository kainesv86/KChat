import * as React from "react";
import { Component } from "react";
import BurgerButton from "../common/burgerButton";

interface NavBarProps {
        isActive?: boolean;
        setActive?: Function;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ isActive = false, setActive = () => {} }) => {
        return (
                <div className="h-14 flex items-center px-2 sm:px-8 sm:py-10 z-10">
                        <div className="sm:hidden block">
                                <BurgerButton func={() => setActive(!isActive)} />
                        </div>
                        <div className="font-semibold text-lg text-gray-900">
                                <a className="mr-6 hover:bg-gray-900/50 hover:text-gray-200 rounded px-2" href="">
                                        Add
                                </a>
                                <a className="mr-6 hover:bg-gray-900/50 hover:text-gray-200 rounded px-2" href="">
                                        Pending
                                </a>
                                <a className="mr-6 hover:bg-gray-900/50 hover:text-gray-200 rounded px-2" href="">
                                        Blocked
                                </a>
                                <a className="mr-6 bg-green-600 text-white px-2 rounded" href="">
                                        Add Friend
                                </a>
                        </div>
                </div>
        );
};

export default NavBar;
