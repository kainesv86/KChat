import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import KChatLogo from "../../public/asset/sidebar-logo";
import UserFriend from "./userFriend";
import { UserFriendProps } from "./userFriend";

interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
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
                <div>
                        <ul className="flex flex-col h-full p-4 w-72">
                                <li className="flex justify-center h-16 mb-2 ">
                                        <Link href="/" className="w-16 rounded-full hover:bg-yellow-100/25 cursor-pointer">
                                                <KChatLogo />
                                        </Link>
                                </li>
                                {userFriends.map((item) => (
                                        <li key={item.username}>
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
