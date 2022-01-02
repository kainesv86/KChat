import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../common/interface/auth.dto";
import authThunk from "./userthunk";

const initialState: AuthState = {
        username: "",
        email: "",
        name: "",
        id: "",
        avatarUrl: "",
        description: "",
        isLogin: false,
};

const auth = createSlice({
        name: "auth",
        initialState,
        reducers: { resetState: () => ({ ...initialState }), updateLogin: (state) => ({ ...state, isLogin: true }) },

        extraReducers: (builder) => {
                builder.addCase(authThunk.loginUser.fulfilled, (state) => ({ ...state, isLogin: true }));
                builder.addCase(authThunk.registerUser.fulfilled, (state) => ({ ...state, isLogin: true }));
                builder.addCase(authThunk.getUserInfo.fulfilled, (state, { payload }) => {
                        const newState = { ...state };
                        newState.name = payload.name;
                        newState.username = payload.username;
                        newState.email = payload.email;
                        newState.avatarUrl = payload.avatarUrl;
                        newState.description = payload.description;
                        newState.id = payload.id;
                        newState.isLogin = true;
                        return newState;
                });
                builder.addCase(authThunk.logoutUser.fulfilled, (state) => ({ ...state, initialState }));
        },
});

export const authActionsx = { ...auth.actions };

export const authReducer = auth.reducer;
