import Link from "next/link";
import * as React from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../../common/interface/auth.dto";

import KChatLogo from "../../public/asset/sidebar-logo";
import LoginIcon from "../../public/asset/login";
import RegisterIcon from "../../public/asset/register";

import { RootState } from "../../store";
import UserFriend from "./userFriend";
import { UserFriendProps } from "./userFriend";
import User from "./user";

import routers from "../../common/constants/routers";

interface SideBarProps {
        isActive?: boolean;
        setActive: Function;
}

const SideBar: React.FunctionComponent<SideBarProps> = ({ isActive = false, setActive = () => {} }) => {
        const { isLogin } = useSelector<RootState, AuthState>((state) => state.auth);

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
                <div
                        className={`sm:w-72 absolute sm:static w-full z-20 duration-300 bg-[#dad4bb] sm:bg-inherit ${
                                isActive ? "" : "-translate-x-full"
                        }  sm:translate-x-0`}
                >
                        <ul className={`flex flex-col h-screen overflow-hidden p-4 space-y-2`}>
                                <li className="flex justify-center h-16" onClick={() => setActive(false)}>
                                        <Link href="/">
                                                <div className="w-16 rounded-full cursor-pointer hover:bg-yellow-100/25">
                                                        <KChatLogo />
                                                </div>
                                        </Link>
                                </li>
                                <li>
                                        <UserFriend name={"No one here"} username="" description={"You need to login to see them again"} />
                                </li>

                                {isLogin
                                        ? userFriends.map((item) => (
                                                  <li key={item.username} onClick={() => setActive(false)}>
                                                          <UserFriend
                                                                  name={item.name}
                                                                  username={item.username}
                                                                  description={item.description}
                                                                  avatarUrl={item.avatarUrl}
                                                          />
                                                  </li>
                                          ))
                                        : null}

                                <div className="block sm:hidden">
                                        {isLogin ? null : (
                                                <div className="flex flex-col">
                                                        <div onClick={() => setActive(false)}>
                                                                <Link href={routers.login.link}>
                                                                        <UserFriend name="Login" username="">
                                                                                <LoginIcon />
                                                                        </UserFriend>
                                                                </Link>
                                                        </div>
                                                        <div onClick={() => setActive(false)}>
                                                                <Link href={routers.register.link}>
                                                                        <UserFriend name="Register" username="">
                                                                                <RegisterIcon />
                                                                        </UserFriend>
                                                                </Link>
                                                        </div>
                                                </div>
                                        )}
                                </div>
                        </ul>
                        <User />
                </div>
        );
};

export default SideBar;
