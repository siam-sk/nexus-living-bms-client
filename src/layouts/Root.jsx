import { Outlet } from "react-router";
import Navbar from "../components/Navbar";


const Root = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            
        </div>
    );
};

export default Root;