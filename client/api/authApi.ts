import { AxiosInstance } from "axios";
import { UserLoginDto, UserRegisterDto } from "../common/interface/auth.dto";

import http from "./axiosCommon";

export class AuthAPI {
        constructor(private readonly apiCall: AxiosInstance, readonly prefix: string) {}

        async loginUser(input: UserLoginDto) {
                const url = `${this.prefix + "/login"}`;
                const res = await this.apiCall.post(url, input);
                return res;
        }

        async registerUser(input: UserRegisterDto) {
                const url = `${this.prefix + "/register"}`;
                const res = await this.apiCall.post(url, input);
                return res;
        }

        async getUserInfo() {
                const url = `${this.prefix + "/me"}`;
                const res = await this.apiCall.get(url);
                return res;
        }

        async logoutUser() {
                const url = `${this.prefix + "/logout"}`;
                const res = await this.apiCall.get(url);
                return res;
        }
}

export const authApi = new AuthAPI(http, "/auth");
export default authApi;
