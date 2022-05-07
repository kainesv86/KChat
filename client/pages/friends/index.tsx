import * as React from "react";
import { useSelector } from "react-redux";
import { userApi } from "../../api/userApi";
import RouteProtection from "../../common/HOC/routerProtectionWrapper";
import { ApiState } from "../../common/interface/api.interface";
import { RelationshipStatus, User } from "../../common/model/user";
import { RootState } from "../../store";
import Image from "next/image";

interface FriendsProps {}

const Friends: React.FunctionComponent<FriendsProps> = () => {
        const [users, setUsers] = React.useState<User[]>([]);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);

        React.useEffect(() => {
                const getFriends = async () => {
                        const users = await userApi.getFriendByStatus(RelationshipStatus.FRIEND);
                        setUsers(users);
                };
                getFriends();
        }, []);

        return (
                <RouteProtection>
                        <div className="flex flex-1 px-2 pt-10">
                                {apiState.isLoading && users.length ? (
                                        <div className="flex flex-col w-full h-10 space-y-4 sm:max-w-2xl">
                                                {users.map((user) => (
                                                        <div key={user.id} className="flex items-center justify-between ">
                                                                <div className="flex">
                                                                        <div className="w-10 h-10 mr-4">
                                                                                <Image
                                                                                        width={40}
                                                                                        height={40}
                                                                                        alt={user.username}
                                                                                        src={
                                                                                                "https://i.ibb.co/PY0ZCXS/49234258-2171577439772648-3163590464041385984-n.jpg"
                                                                                        }
                                                                                />
                                                                        </div>
                                                                        <div>
                                                                                <p className="text-base font-semibold text-gray-700 group-hover:text-gray-100">
                                                                                        {user.username}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                        <button className="block w-10 h-10 bg-gray-600 shadow-nier"></button>
                                                                        <button className="block w-10 h-10 bg-gray-600 shadow-nier"></button>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                ) : (
                                        <p className="text-base font-semibold text-gray-700 group-hover:text-gray-100">
                                                You really have the friends aye?
                                        </p>
                                )}
                        </div>
                </RouteProtection>
        );
};

export default Friends;
