import * as React from "react";

export interface UserFriendProps {
        avatarUrl?: string;
        username?: string;
        name: string;
        description?: string;
}

const UserFriend: React.FunctionComponent<UserFriendProps> = ({ avatarUrl, description, name, username, children }) => {
        return (
                <div className="group transform cursor-pointer mb-2">
                        <span className="block w-0 group-hover:w-full h-px mb-px bg-gray-900"></span>
                        <div className="relative flex flex-col">
                                <div className="absolute block w-0 h-full duration-500 transform group-hover:w-full bg-gray-900/50"></div>
                                <div className="z-10 flex px-2 py-1">
                                        {Boolean(avatarUrl || children) ? (
                                                <div className="w-10 h-10 mr-4">
                                                        {/* Use url to display image */}
                                                        {avatarUrl ? <img className="w-full h-full" src={avatarUrl} alt={username} /> : null}
                                                        {/* Use children to display image */}
                                                        {children ? children : null}
                                                </div>
                                        ) : null}
                                        <div className="flex flex-col justify-center text-left">
                                                <p className="text-base font-semibold text-gray-700 group-hover:text-gray-100">{name}</p>
                                                {description ? (
                                                        <p className="text-xs font-semibold text-gray-600 group-hover:text-gray-200">{description}</p>
                                                ) : null}
                                        </div>
                                </div>
                        </div>
                        <span className="block w-full group-hover:opacity-100 opacity-0 h-px mt-px bg-gray-900"></span>
                </div>
        );
};

export default UserFriend;
