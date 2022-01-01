import "../styles/globals.css";
import SideBar from "../components/sideBar";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
        return (
                <div className="bg-[#CDC8B0] h-screen flex">
                        <SideBar />
                        <Component {...pageProps} />
                </div>
        );
}

export default MyApp;
