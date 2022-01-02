import * as React from "react";

import Link from "next/link";

import { useSelector } from "react-redux";
import { AuthState } from "../../common/interface/auth.dto";
import { RootState } from "../../store";
import BurgerButton from "../common/burgerButton";

interface NavBarProps {
        isActive?: boolean;
        setActive?: Function;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ isActive = false, setActive = () => {} }) => {
        const { isLogin } = useSelector<RootState, AuthState>((state) => state.auth);

        return (
                <div className="flex items-center px-4 sm:px-8 sm:py-10 py-4 z-10 bg-[#c8c3ad]">
                        <div className="sm:hidden block bg-[#c8c3ad]">
                                <BurgerButton func={() => setActive(!isActive)} />
                        </div>

                        {isLogin ? (
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
                        ) : (
                                <div className="font-semibold text-lg text-gray-900 sm:block hidden">
                                        <Link href="/user/login">
                                                <a className="mr-6 hover:bg-gray-900/50 hover:text-gray-200 rounded px-2" href="/user/login">
                                                        Login
                                                </a>
                                        </Link>
                                        <Link href="/user/register">
                                                <a className="mr-6 hover:bg-gray-900/50 hover:text-gray-200 rounded px-2" href="user/register">
                                                        Register
                                                </a>
                                        </Link>
                                </div>
                        )}
                </div>
        );
};

export default NavBar;
