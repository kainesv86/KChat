import "../styles/globals.css";
import * as React from "react";

import Cookies from "universal-cookie";

import SideBar from "../components/sideBar";
import NavBar from "../components/navbar";

import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { store } from "../store";
import { authActions } from "../store/auth";
import GetCurrentUserWrapper from "../common/HOC/getCurrentUserWrapper";

function MyApp({ Component, pageProps }: AppProps) {
        const [activeBurger, setActiveBurger] = React.useState<boolean>(false);

        return (
                <Provider store={store}>
                        <GetCurrentUserWrapper>
                                <div className="relative flex h-screen bg-yohra">
                                        <SideBar isActive={activeBurger} setActive={setActiveBurger} />
                                        <div className="flex flex-col flex-1">
                                                <NavBar isActive={activeBurger} setActive={setActiveBurger} />
                                                <Component {...pageProps} />
                                        </div>
                                </div>
                        </GetCurrentUserWrapper>
                </Provider>
        );
}

export default MyApp;
