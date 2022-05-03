import * as React from "react";

import Link from "next/link";

import { useSelector } from "react-redux";
import { AuthState } from "../../common/interface/auth.dto";
import { RootState } from "../../store";
import BurgerButton from "../common/burgerButton";
import routers from "../../common/constants/routers";

interface NavBarProps {
        isActive?: boolean;
        setActive?: Function;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ isActive = false, setActive = () => {} }) => {
        const { isLogin } = useSelector<RootState, AuthState>((state) => state.auth);

        // bg-[#c8c3ad]
        return (
                <div className="z-10 flex items-center px-4 py-4 sm:px-8 sm:py-10">
                        <div className="block sm:hidden">
                                <BurgerButton func={() => setActive(!isActive)} />
                        </div>

                        {isLogin ? (
                                <div className="hidden space-x-6 text-lg font-semibold text-gray-900 sm:flex">
                                        <Link href={`${routers.friends.link}`}>
                                                <p className="px-2 rounded hover:bg-gray-900/50 hover:text-gray-200">All</p>
                                        </Link>
                                        <Link href={`${routers.pendingFriends.link}`}>
                                                <p className="px-2 rounded hover:bg-gray-900/50 hover:text-gray-200">Pending</p>
                                        </Link>
                                        <Link href={`${routers.blockFriends.link}`}>
                                                <p className="px-2 rounded hover:bg-gray-900/50 hover:text-gray-200">Blocked</p>
                                        </Link>

                                        <Link href={`${routers.addFriends.link}`}>
                                                <p className="px-2 text-white bg-green-600 rounded">Add Friend</p>
                                        </Link>
                                </div>
                        ) : (
                                <div className="hidden space-x-6 text-lg font-semibold text-gray-900 sm:flex">
                                        <Link href="/auth/login">
                                                <p className="px-2 rounded hover:bg-gray-900/50 hover:text-gray-200">Login</p>
                                        </Link>
                                        <Link href="/auth/register">
                                                <p className="px-2 rounded hover:bg-gray-900/50 hover:text-gray-200">Register</p>
                                        </Link>
                                </div>
                        )}
                </div>
        );
};

export default NavBar;
