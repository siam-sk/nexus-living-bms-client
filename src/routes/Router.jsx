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
import AdminRoute from "./AdminRoute";
import AdminProfile from "../pages/dashboard/AdminProfile";
import ManageMembers from "../pages/dashboard/ManageMembers";
import MakeAnnouncement from "../pages/dashboard/MakeAnnouncement";
import AgreementRequests from "../pages/dashboard/AgreementRequests";
import ManageCoupons from "../pages/dashboard/ManageCoupons";

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
            // User Routes
            {
                path: 'my-profile',
                element: <MyProfile />
            },
            {
                path: 'announcements',
                element: <Announcements />
            },
            // Admin Routes
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile /></AdminRoute>
            },
            {
                path: 'manage-members',
                element: <AdminRoute><ManageMembers /></AdminRoute>
            },
            {
                path: 'make-announcement',
                element: <AdminRoute><MakeAnnouncement /></AdminRoute>
            },
            {
                path: 'agreement-requests',
                element: <AdminRoute><AgreementRequests /></AdminRoute>
            },
            {
                path: 'manage-coupons',
                element: <AdminRoute><ManageCoupons /></AdminRoute>
            }
        ]
    }
]);