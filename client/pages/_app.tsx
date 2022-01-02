import "../styles/globals.css";
import * as React from "react";

import SideBar from "../components/sideBar";
import NavBar from "../components/navbar";

import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
        const [activeBurger, setActiveBurger] = React.useState<boolean>(false);

        return (
                <Provider store={store}>
                        <div className="bg-[#CDC8B0] h-screen flex relative">
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
