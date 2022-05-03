import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AuthState } from "../interface/auth.dto";
import routers from "../constants/routers";

interface RouterProtectionProps {}

const RouterProtection: React.FunctionComponent<RouterProtectionProps> = ({ children }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const router = useRouter();
        React.useEffect(() => {
                console.log(authState);
                if (!authState.isLogin) {
                        router.push(routers.login.link);
                }
        }, [authState, router]);

        return <>{children}</>;
};

export default RouterProtection;
