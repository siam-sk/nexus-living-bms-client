import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from 'react-hot-toast';
import usePageTitle from "../hooks/usePageTitle";


const Root = () => {
    usePageTitle();
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <Toaster />
        </div>
    );
};

export default Root;