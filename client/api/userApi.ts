import { AxiosInstance } from "axios";
import { AddFriendsDto, RelationshipStatus, User } from "../common/model/user";
import http from "./axiosCommon";

export class UserAPI {
        constructor(private readonly apiCall: AxiosInstance, readonly prefix: string) {}
        async getFriendByStatus(status: RelationshipStatus) {
                const url = `${this.prefix + "/friends/"}status=${status}`;
                const res = await this.apiCall.get<User[]>(url);
                return res.data;
        }

        async handleFriendStatus(username: string, status: RelationshipStatus) {
                const url = `${this.prefix + "/friends/handle-status"}`;
                await this.apiCall.patch(url, { friendUsername: username, status });
        }

        async handleAddFriend(data: AddFriendsDto) {
                const url = `${this.prefix + "/friends/add"}`;
                const res = await this.apiCall.post(url, data);
                return res.data;
        }
}

export const userApi = new UserAPI(http, "/user");
export default userApi;
