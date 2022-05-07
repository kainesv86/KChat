import { AddFriendsDto, RelationshipStatus, User } from "../common/model/user";
import http from "./axiosCommon";

const prefix = "/user";

export const userApi = {
        getFriendByStatus: async (status: RelationshipStatus) => {
                const url = `${prefix + "/friends/"}status=${status}`;
                const res = await http.get<User[]>(url);
                return res.data;
        },

        handleFriendStatus: async (username: string, status: RelationshipStatus) => {
                const url = `${prefix + "/friends/handle-status"}`;
                await http.patch(url, { friendUsername: username, status });
        },
        handleAddFriend: async (data: AddFriendsDto) => {
                const url = `${prefix + "/friends/add"}`;
                const res = await http.post(url, data);
                return res.data;
        },
        getUserInfo: async () => {
                const url = `${prefix + "/me"}`;
                const res = await http.get<User>(url);
                return res;
        },
};
export default userApi;
