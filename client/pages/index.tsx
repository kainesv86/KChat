import type { NextPage } from "next";
import SideBar from "../components/sideBar";

const Home: NextPage = () => {
        return (
                <div className="bg-[#CDC8B0] h-screen flex">
                        <SideBar />
                        <div className="">
                                <h1 className="text-3xl font-bold underline text-black"> Hello world! </h1>
                        </div>
                </div>
        );
};

export default Home;
