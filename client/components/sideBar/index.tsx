import Link from "next/link";
import * as React from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../../common/interface/auth.dto";

import KChatLogo from "../../public/asset/sidebar-logo";
import { RootState } from "../../store";
import UserFriend from "./userFriend";
import { UserFriendProps } from "./userFriend";

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
                        className={`sm:w-72 absolute sm:static w-full  z-20 duration-300 bg-[#dad4bb] sm:bg-inherit ${
                                isActive ? "" : "-translate-x-full"
                        }  sm:translate-x-0`}
                >
                        <ul className={`flex flex-col h-screen p-4 overflow-hidden`}>
                                <li className="flex justify-center h-16 mb-2" onClick={() => setActive(false)}>
                                        <Link href="/">
                                                <a href="/" className="w-16 rounded-full hover:bg-yellow-100/25 cursor-pointer">
                                                        <KChatLogo />
                                                </a>
                                        </Link>
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

                                <div className="sm:hidden block">
                                        {isLogin ? null : (
                                                <div className="flex flex-col">
                                                        <div onClick={() => setActive(false)}>
                                                                <Link href="/user/login">
                                                                        <a href="/user/login">
                                                                                <UserFriend
                                                                                        avatarUrl="https://i.ibb.co/PY0ZCXS/49234258-2171577439772648-3163590464041385984-n.jpg"
                                                                                        name="Login"
                                                                                        username=""
                                                                                />
                                                                        </a>
                                                                </Link>
                                                        </div>
                                                        <div onClick={() => setActive(false)}>
                                                                <Link href="/user/register">
                                                                        <a href="/user/register">
                                                                                <UserFriend
                                                                                        avatarUrl="https://i.ibb.co/PY0ZCXS/49234258-2171577439772648-3163590464041385984-n.jpg"
                                                                                        name="Register"
                                                                                        username=""
                                                                                />
                                                                        </a>
                                                                </Link>
                                                        </div>
                                                </div>
                                        )}
                                </div>
                        </ul>
                </div>
        );
};

export default SideBar;
