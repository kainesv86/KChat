import * as React from "react";
import { Component } from "react";
import Cookies from "universal-cookie";
import userApi from "../../api/userApi";
import { store } from "../../store";
import { authActions } from "../../store/auth";
import { userThunk } from "../../store/auth/userthunk";

interface GetCurrentUserWrapperProps {}

const GetCurrentUserWrapper: React.FunctionComponent<GetCurrentUserWrapperProps> = ({ children }) => {
        React.useEffect(() => {
                const cookies = new Cookies();
                const token = cookies.get("access-token");

                if (token) {
                        store.dispatch(userThunk.getCurrentUser());
                } else {
                        store.dispatch(authActions.resetState());
                }
        }, []);
        return <>{children}</>;
};

export default GetCurrentUserWrapper;
