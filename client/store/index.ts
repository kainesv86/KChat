import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ApiState } from "../common/interface/api.interface";
import { AuthState } from "../common/interface/auth.dto";
import { apiReducer } from "./api";
import { authReducer } from "./auth";

export interface RootState {
        auth: AuthState;
        api: ApiState;
}

const reducers = combineReducers<RootState>({ auth: authReducer, api: apiReducer });

export const store = configureStore({ reducer: reducers });
