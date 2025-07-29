import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Apartment from "../pages/Apartment";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/dashboard/MyProfile";
import Announcements from "../pages/dashboard/Announcements";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'apartment',
                element: <Apartment />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: 'my-profile',
                element: <MyProfile />
            },
            {
                path: 'announcements',
                element: <Announcements />
            }
        ]
    }
]);