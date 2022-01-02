import * as React from "react";
import { Component } from "react";
import BurgerButton from "../common/burgerButton";

interface NavBarProps {
        isActive?: boolean;
        setActive?: Function;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ isActive = false, setActive = () => {} }) => {
        return (
                <div className="h-14 bg-red-500 flex items-center px-2 z-10">
                        <BurgerButton func={() => setActive(!isActive)} />
                </div>
        );
};

export default NavBar;
