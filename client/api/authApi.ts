import { UserLoginDto, UserRegisterDto } from "../common/interface/auth.dto";

import http from "./axiosCommon";

const prefix = "auth";

export const authApi = {
        loginUser: async (input: UserLoginDto) => {
                const url = `${prefix + "/login"}`;
                const res = await http.post(url, input);
                return res;
        },

        registerUser: async (input: UserRegisterDto) => {
                const url = `${prefix + "/register"}`;
                const res = await http.post(url, input);
                return res;
        },

        getUserInfo: async () => {
                const url = `${prefix + "/me"}`;
                const res = await http.get(url);
                return res;
        },

        logoutUser: async () => {
                const url = `${prefix + "/logout"}`;
                const res = await http.get(url);
                return res;
        },
};
