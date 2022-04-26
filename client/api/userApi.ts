import { AxiosInstance } from "axios";
import { RelationshipStatus, User } from "../common/model/user";
import http from "./axiosCommon";

export class UserAPI {
        constructor(private readonly apiCall: AxiosInstance, readonly prefix: string) {}
        async getFriendByStatus(status: RelationshipStatus) {
                const url = `${this.prefix + "/friends/"}status=${status}`;
                const res = await this.apiCall.get<User[]>(url);
                console.log(res.data);
                return res.data;
        }

        async handleFriendStatus(username: string, status: RelationshipStatus) {
                const url = `${this.prefix + "/friends/handle-status"}`;
                await this.apiCall.patch(url, { friendUsername: username, status });
        }
}

export const userApi = new UserAPI(http, "/user");
export default userApi;
