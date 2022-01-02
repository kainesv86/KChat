import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthState } from "../common/interface/auth.dto";
import { authReducer } from "./auth";

export interface RootState {
        auth: AuthState;
}
const reducers = combineReducers<RootState>({ auth: authReducer });

export const store = configureStore({ reducer: reducers });
