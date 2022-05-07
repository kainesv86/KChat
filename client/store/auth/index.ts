import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../common/interface/auth.dto";
import { userThunk } from "./userthunk";

const initialState: AuthState = {
        username: "",
        email: "",
        name: "",
        id: "",
        avatarUrl: "",
        description: "",
        isLogin: true,
};

const auth = createSlice({
        name: "auth",
        initialState,
        reducers: { resetState: () => ({ ...initialState, isLogin: false }), updateLogin: (state) => ({ ...state, isLogin: true }) },

        extraReducers: (builder) => {
                builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
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
        },
});

export const authActions = { ...auth.actions };

export const authReducer = auth.reducer;
