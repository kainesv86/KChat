import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../api/axiosCommon";
import { User } from "../../common/model/user";

export const userThunk = {
        getCurrentUser: createAsyncThunk<User, void>("getCurrentUser", async (_, { rejectWithValue }) => {
                try {
                        const res = await http.get<User>("/user/me");
                        return res.data;
                } catch (error) {
                        return rejectWithValue(null);
                }
        }),
};
