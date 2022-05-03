import { useRouter } from "next/router";
import * as React from "react";
import { Component } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ApiState } from "../interface/api.interface";
import { AuthState } from "../interface/auth.dto";
import routers from "../constants/routers";

interface RouteProtectedProps {
        isNeedLogin?: boolean;
}

const RouteProtected: React.FunctionComponent<RouteProtectedProps> = ({ isNeedLogin = false, children }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);

        const router = useRouter();

        React.useEffect(() => {
                console.log("Is Login:" + authState.isLogin);
                if (!apiState.isLoading) {
                        if (!authState.isLogin && isNeedLogin) router.push(routers.login.link);
                        else if (!isNeedLogin && authState.isLogin) router.push(routers.home.link);
                }
        }, [authState]);
        return <>{children}</>;
};

export default RouteProtected;
