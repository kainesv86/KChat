import type { NextPage } from "next";
import SideBar from "../components/sideBar";

const Home: NextPage = () => {
        return (
                <div className="flex-1 bg-red-300">
                        <h1 className="text-3xl font-bold text-black underline"> Hello world! </h1>
                </div>
        );
};

export default Home;
