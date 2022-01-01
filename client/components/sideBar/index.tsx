import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import KChatLogo from "../../public/asset/sidebar-logo";

interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
        return (
                <div>
                        <ul className="flex flex-col h-full p-4 w-72">
                                <li className="flex justify-center h-16 mb-2 ">
                                        <Link href="/" className="w-16 rounded-full hover:bg-yellow-100/25 cursor-pointer">
                                                <KChatLogo />
                                        </Link>
                                </li>
                                <li className="relative flex items-center mb-2 duration-300 transform cursor-pointer group">
                                        <div className="absolute block w-0 h-full duration-300 transform group-hover:w-full bg-gray-900/50"></div>
                                        <div className="z-10 flex p-2">
                                                <div className="w-12 h-12 mr-4">
                                                        <img
                                                                className="w-full h-full"
                                                                src="https://i.ibb.co/PY0ZCXS/49234258-2171577439772648-3163590464041385984-n.jpg"
                                                                alt="Kaine"
                                                        />
                                                </div>
                                                <div className="flex flex-col justify-center text-left">
                                                        <p className="text-base font-semibold text-gray-700 group-hover:text-gray-100">Kainé</p>
                                                        <p className="text-xs font-semibold text-gray-600 group-hover:text-gray-200">Void Jumping</p>
                                                </div>
                                        </div>
                                </li>
                        </ul>
                </div>
        );
};

export default SideBar;
