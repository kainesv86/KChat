import { createSlice } from "@reduxjs/toolkit";

const initialState: ApiState = {
        isLoading: false,
        errorDetails: {},
        isError: false,
        message: "",
        errorMessage: "",
};

const reducer = createSlice({
        name: "api",
        initialState,
        reducers: {
                initReq: (state) => ({ ...state, isLoading: true, isError: false }),
                setLoading: (state, { payload: { isLoading } }) => ({ ...state, isLoading }),
                resetState: (_) => ({ ...initialState }),
                updateErrorDetails: (state, { payload }),
        },
});
