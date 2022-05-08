import Link from "next/link";
import * as React from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../../common/interface/auth.dto";

import KChatLogo from "../../public/asset/sidebar-logo";
import LoginIcon from "../../public/asset/login";
import RegisterIcon from "../../public/asset/register";

import { RootState } from "../../store";
import UserFriendCard from "./userFriendCard";
import UserCard from "./userCard";

import routers from "../../common/constants/routers";
import { userApi } from "../../api/userApi";
import { RelationshipStatus, User } from "../../common/model/user";

interface SideBarProps {
        isActive?: boolean;
        setActive: Function;
}

const SideBar: React.FunctionComponent<SideBarProps> = ({ isActive = false, setActive = () => {} }) => {
        const [userFriends, setUserFriends] = React.useState<User[]>([]);
        const { isLogin } = useSelector<RootState, AuthState>((state) => state.auth);

        React.useEffect(() => {
                const getFriends = async () => {
                        const users = await userApi.getFriendByStatus(RelationshipStatus.FRIEND);
                        setUserFriends(users);
                };
                getFriends();
        }, []);

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
                                <li></li>

                                {isLogin ? (
                                        userFriends.map((item) => (
                                                <li key={item.username} onClick={() => setActive(false)}>
                                                        <UserFriendCard
                                                                userId={item.id}
                                                                name={item.name}
                                                                username={item.username}
                                                                description={item.description}
                                                                avatarUrl={
                                                                        "https://i.ibb.co/PY0ZCXS/49234258-2171577439772648-3163590464041385984-n.jpg"
                                                                }
                                                        />
                                                </li>
                                        ))
                                ) : (
                                        <UserFriendCard name={"No one here"} username="" description={"You need to login to see them again"} />
                                )}

                                <div className="block sm:hidden">
                                        {isLogin ? null : (
                                                <div className="flex flex-col">
                                                        <div onClick={() => setActive(false)}>
                                                                <Link href={routers.login.link}>
                                                                        <UserFriendCard name="Login" username="">
                                                                                <LoginIcon />
                                                                        </UserFriendCard>
                                                                </Link>
                                                        </div>
                                                        <div onClick={() => setActive(false)}>
                                                                <Link href={routers.register.link}>
                                                                        <UserFriendCard name="Register" username="">
                                                                                <RegisterIcon />
                                                                        </UserFriendCard>
                                                                </Link>
                                                        </div>
                                                </div>
                                        )}
                                </div>
                        </ul>
                        <UserCard />
                </div>
        );
};

export default SideBar;
