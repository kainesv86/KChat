import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ApiState } from "../interface/api.interface";
import { AuthState } from "../interface/auth.dto";
import routers from "../constants/routers";

interface RouteProtectedProps {}

const RouteProtected: React.FunctionComponent<RouteProtectedProps> = ({ children }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);

        const router = useRouter();

        React.useEffect(() => {
                if (authState.isLogin && authState.id) router.push(routers.home.link);
        }, [authState, router]);
        return <>{children}</>;
};

export default RouteProtected;
