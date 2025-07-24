import { Outlet } from "react-router";

const Root = () => {
    return (
        <div>
            
            <main>
                <Outlet />
            </main>
            
        </div>
    );
};

export default Root;