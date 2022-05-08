import * as React from "react";
import Link from "next/link";
import routers from "../../common/constants/routers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AuthState } from "../../common/interface/auth.dto";

export interface UserFriendProps {
        avatarUrl?: string;
        username?: string;
        userId?: string;
        name: string;
        description?: string;
        linkUrl?: string;
}

const UserFriend: React.FunctionComponent<UserFriendProps> = ({ avatarUrl, description, name, username, children, linkUrl, userId }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const [link, setLink] = React.useState<string>("");
        React.useEffect(() => {
                if (linkUrl) setLink(linkUrl);
                else {
                        const roomArrayId = [authState.id, userId].sort();
                        setLink(`${routers.chat.link}//${roomArrayId[0]}-${roomArrayId[1]}`);
                }
        }, [authState.id, linkUrl, userId]);

        return (
                <>
                        <Link href={link}>
                                <div className="transform cursor-pointer group">
                                        <span className="block w-0 h-px mb-px bg-gray-900 group-hover:w-full"></span>
                                        <div className="relative flex flex-col">
                                                <div className="absolute block w-0 h-full duration-500 transform group-hover:w-full bg-gray-900/50"></div>
                                                <div className="z-10 flex px-2 py-1">
                                                        {Boolean(avatarUrl || children) ? (
                                                                <div className="w-10 h-10 mr-4">
                                                                        {/* Use url to display image */}
                                                                        {avatarUrl ? (
                                                                                <img className="w-full h-full" src={avatarUrl} alt={username} />
                                                                        ) : null}
                                                                        {/* Use children to display image */}
                                                                        {children ? children : null}
                                                                </div>
                                                        ) : null}
                                                        <div className="flex flex-col justify-center text-left">
                                                                <p className="text-base font-semibold text-gray-700 group-hover:text-gray-100">
                                                                        {name ? name : username}
                                                                </p>

                                                                <p className="text-xs font-semibold text-gray-600 group-hover:text-gray-200">
                                                                        {description ? description : ""}
                                                                </p>
                                                        </div>
                                                </div>
                                        </div>
                                        <span className="block w-full h-px mt-px bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                </div>
                        </Link>
                </>
        );
};

export default UserFriend;
