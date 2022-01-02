import "../styles/globals.css";
import * as React from "react";
import SideBar from "../components/sideBar";
import type { AppProps } from "next/app";
import NavBar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
        const [activeBurger, setActiveBurger] = React.useState<boolean>(false);

        return (
                <div className="bg-[#CDC8B0] h-screen flex relative">
                        <SideBar isActive={activeBurger} setActive={setActiveBurger} />
                        <div className="flex-1 flex flex-col">
                                <NavBar isActive={activeBurger} setActive={setActiveBurger} />
                                <Component {...pageProps} />
                        </div>
                </div>
        );
}

export default MyApp;
