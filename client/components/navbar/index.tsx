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

        // bg-[#c8c3ad]
        return (
                <div className="flex items-center px-4 sm:px-8 sm:py-10 py-4 z-10">
                        <div className="block sm:hidden">
                                <BurgerButton func={() => setActive(!isActive)} />
                        </div>

                        {isLogin ? (
                                <div className="hidden text-lg font-semibold text-gray-900 sm:block">
                                        <a className="px-2 mr-6 rounded hover:bg-gray-900/50 hover:text-gray-200" href="">
                                                All
                                        </a>
                                        <a className="px-2 mr-6 rounded hover:bg-gray-900/50 hover:text-gray-200" href="/user/friends/pending">
                                                Pending
                                        </a>
                                        <a className="px-2 mr-6 rounded hover:bg-gray-900/50 hover:text-gray-200" href="">
                                                Blocked
                                        </a>
                                        <a className="px-2 mr-6 text-white bg-green-600 rounded" href="">
                                                Add Friend
                                        </a>
                                </div>
                        ) : (
                                <div className="hidden text-lg font-semibold text-gray-900 sm:block">
                                        <Link href="/auth/login">
                                                <p className="px-2 mr-6 rounded hover:bg-gray-900/50 hover:text-gray-200">Login</p>
                                        </Link>
                                        <Link href="/auth/register">
                                                <p className="px-2 mr-6 rounded hover:bg-gray-900/50 hover:text-gray-200">Register</p>
                                        </Link>
                                </div>
                        )}
                </div>
        );
};

export default NavBar;
