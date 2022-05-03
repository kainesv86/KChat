import * as React from "react";
import { Component } from "react";
import Cookies from "universal-cookie";
import { store } from "../../store";
import { authActions } from "../../store/auth";

interface GetCurrentUserWrapperProps {}

const GetCurrentUserWrapper: React.FunctionComponent<GetCurrentUserWrapperProps> = ({ children }) => {
        React.useEffect(() => {
                const cookies = new Cookies();
                const token = cookies.get("access-token");

                if (token) {
                        store.dispatch(authActions.updateLogin());
                } else {
                }
        }, []);
        return <>{children}</>;
};

export default GetCurrentUserWrapper;
