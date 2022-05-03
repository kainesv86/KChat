import * as React from "react";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { RootState, store } from "../store";
import { AuthState } from "../common/interface/auth.dto";
import authThunk from "../store/auth/userthunk";

const Home: NextPage = () => {
        const { isLogin } = useSelector<RootState, AuthState>((state) => state.auth);
        React.useEffect(() => {
                if (isLogin) store.dispatch(authThunk.getUserInfo());
        }, [isLogin]);
        return (
                <div className="flex-1 ">
                        <div>Hello</div>
                </div>
        );
};

export default Home;
