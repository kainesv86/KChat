import "../styles/globals.css";
import * as React from "react";

import Cookies from "universal-cookie";

import SideBar from "../components/sideBar";
import NavBar from "../components/navbar";

import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { store } from "../store";
import { authActions } from "../store/auth";

function MyApp({ Component, pageProps }: AppProps) {
        const [activeBurger, setActiveBurger] = React.useState<boolean>(false);
        const cookies = new Cookies();

        React.useEffect(() => {
                const accessToken = cookies.get("access-token");
                if (accessToken) store.dispatch(authActions.updateLogin);
        });

        React.useEffect(() => {}, []);

        return (
                <Provider store={store}>
                        <div className="bg-yohra h-screen flex relative">
                                <SideBar isActive={activeBurger} setActive={setActiveBurger} />
                                <div className="flex-1 flex flex-col">
                                        <NavBar isActive={activeBurger} setActive={setActiveBurger} />
                                        <Component {...pageProps} />
                                </div>
                        </div>
                </Provider>
        );
}

export default MyApp;
