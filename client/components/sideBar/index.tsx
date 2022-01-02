import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import KChatLogo from "../../public/asset/sidebar-logo";
import UserFriend from "./userFriend";
import { UserFriendProps } from "./userFriend";

interface SideBarProps {
        isActive?: boolean;
        setActive: Function;
}

const SideBar: React.FunctionComponent<SideBarProps> = ({ isActive = false, setActive = () => {} }) => {
        const userFriends: Array<UserFriendProps> = [
                {
                        name: "Kainé",
                        description: "Void Jumping",
                        avatarUrl: "https://i.ibb.co/PY0ZCXS/49234258-2171577439772648-3163590464041385984-n.jpg",
                        username: "kainesv86",
                },
                {
                        name: "Kainé Sven",
                        description: "Void Jumping",
                        avatarUrl: "https://i.ibb.co/PY0ZCXS/49234258-2171577439772648-3163590464041385984-n.jpg",
                        username: "kainesv85",
                },
        ];
        return (
                <div className={`absolute sm:static w-full bg-[#dad4bb] z-20 duration-300 ${isActive ? "" : "-translate-x-full"}  sm:translate-x-0`}>
                        <ul className={`flex  flex-col h-screen p-4 sm:w-72 w-full   overflow-hidden bg-transparent sm:bg-inherit  `}>
                                <li className="flex justify-center h-16 mb-2" onClick={() => setActive(false)}>
                                        <Link href="/" passHref={true}>
                                                <a href="/" className="w-16 rounded-full hover:bg-yellow-100/25 cursor-pointer">
                                                        <KChatLogo />
                                                </a>
                                        </Link>
                                </li>
                                {userFriends.map((item) => (
                                        <li key={item.username} onClick={() => setActive(false)}>
                                                <UserFriend
                                                        name={item.name}
                                                        username={item.username}
                                                        description={item.description}
                                                        avatarUrl={item.avatarUrl}
                                                />
                                        </li>
                                ))}
                        </ul>
                </div>
        );
};

export default SideBar;
