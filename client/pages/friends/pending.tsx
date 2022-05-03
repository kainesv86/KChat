import * as React from "react";
import { Component } from "react";
import userApi from "../../api/userApi";
import RouteProtected from "../../common/HOC/routerProtedtedWrapper";
import { RelationshipStatus, User } from "../../common/model/user";

interface AddFriendsProps {}

const AddFriends: React.FunctionComponent<AddFriendsProps> = () => {
        const [users, setUsers] = React.useState<User[]>([]);

        const handleOnRequest = async (username: string, status: RelationshipStatus) => {
                await userApi.handleFriendStatus(username, status);
                await getFriends();
        };

        const getFriends = async () => {
                const users = await userApi.getFriendByStatus(RelationshipStatus.PENDING);
                setUsers(users);
        };

        React.useEffect(() => {
                getFriends();
        }, []);

        return (
                <RouteProtected isNeedLogin={true}>
                        <div className="flex flex-1 pt-10 px-36">
                                {users.length ? (
                                        <div className="flex flex-col w-full h-10 space-y-4 sm:max-w-2xl">
                                                {users.map((user) => (
                                                        <div key={user.id} className="flex items-center justify-between ">
                                                                <div className="flex">
                                                                        <div className="w-10 h-10 mr-4">
                                                                                <img
                                                                                        className="w-full h-full"
                                                                                        src={
                                                                                                "https://i.ibb.co/PY0ZCXS/49234258-2171577439772648-3163590464041385984-n.jpg"
                                                                                        }
                                                                                        alt={user.username}
                                                                                />
                                                                        </div>
                                                                        <div>
                                                                                <p className="text-base font-semibold text-gray-700 group-hover:text-gray-100">
                                                                                        {user.username}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                        <button
                                                                                className="block w-10 h-10 bg-green-500 rounded-full"
                                                                                onClick={() =>
                                                                                        handleOnRequest(user.username, RelationshipStatus.FRIEND)
                                                                                }
                                                                        ></button>
                                                                        <button
                                                                                className="block w-10 h-10 bg-yellow-500 rounded-full"
                                                                                onClick={() =>
                                                                                        handleOnRequest(user.username, RelationshipStatus.NONE)
                                                                                }
                                                                        ></button>
                                                                        <button
                                                                                className="block w-10 h-10 bg-red-500 rounded-full"
                                                                                onClick={() =>
                                                                                        handleOnRequest(user.username, RelationshipStatus.BLOCK)
                                                                                }
                                                                        ></button>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                ) : (
                                        <p className="text-base font-semibold text-gray-700 group-hover:text-gray-100">Nothing left to do aye!</p>
                                )}
                        </div>
                </RouteProtected>
        );
};

export default AddFriends;
