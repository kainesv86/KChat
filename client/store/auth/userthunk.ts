import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, UserLoginDto, UserRegisterDto } from "../../common/interface/auth.dto";
import { AuthAPI, authApi } from "../../api/authApi";

class AuthThunk {
        constructor(private readonly apiCall: AuthAPI) {}

        loginUser = createAsyncThunk<null, UserLoginDto>("UserLoginDto", async (input) => {
                await this.apiCall.loginUser(input);
                return null;
        });

        registerUser = createAsyncThunk<null, UserRegisterDto>("UserRegisterDto", async (input) => {
                await this.apiCall.registerUser(input);
                return null;
        });

        getUserInfo = createAsyncThunk<AuthState, void>("AuthState", async () => {
                const res = await this.apiCall.getUserInfo();
                return res.data;
        });

        logoutUser = createAsyncThunk<void, void>("LogoutState", async () => {
                await this.apiCall.logoutUser();
        });
}

export const authThunk = new AuthThunk(authApi);

export default authThunk;
