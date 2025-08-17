import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Apartment from '../pages/Apartment';
import DashboardLayout from '../layouts/DashboardLayout';
import MyProfile from '../pages/dashboard/MyProfile';
import AdminProfile from '../pages/dashboard/AdminProfile';
import Announcements from '../pages/dashboard/Announcements';
import MakePayment from '../pages/dashboard/MakePayment';
import PaymentHistory from '../pages/dashboard/PaymentHistory';
import ManageMembers from '../pages/dashboard/ManageMembers';
import MakeAnnouncement from '../pages/dashboard/MakeAnnouncement';
import AgreementRequests from '../pages/dashboard/AgreementRequests';
import ManageCoupons from '../pages/dashboard/ManageCoupons';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import PaymentGateway from '../pages/dashboard/PaymentGateway';
import NotFound from '../pages/NotFound';
import Overview from '../pages/dashboard/Overview';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home />, handle: { title: 'Home' } },
            { path: '/login', element: <Login />, handle: { title: 'Login' } },
            { path: '/register', element: <Register />, handle: { title: 'Register' } },
            { path: '/apartment', element: <Apartment />, handle: { title: 'Apartments' } },
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'overview',
                element: <Overview />,
                handle: { title: 'Overview' }
            },
            {
                path: 'my-profile',
                element: <MyProfile />,
                handle: { title: 'My Profile' }
            },
            {
                path: 'admin-profile',
                element: <AdminProfile />,
                handle: { title: 'Admin Profile' }
            },
            {
                path: 'announcements',
                element: <Announcements />,
                handle: { title: 'Announcements' }
            },
            {
                path: 'make-payment',
                element: <MakePayment />,
                handle: { title: 'Make Payment' }
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />,
                handle: { title: 'Payment History' }
            },
            {
                path: 'payment-gateway',
                element: <PaymentGateway />,
                handle: { title: 'Payment' }
            },
            // Admin only routes
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile /></AdminRoute>,
                handle: { title: 'Admin Profile' }
            },
            {
                path: 'manage-members',
                element: <AdminRoute><ManageMembers /></AdminRoute>,
                handle: { title: 'Manage Members' }
            },
            {
                path: 'make-announcement',
                element: <AdminRoute><MakeAnnouncement /></AdminRoute>,
                handle: { title: 'Make Announcement' }
            },
            {
                path: 'agreement-requests',
                element: <AdminRoute><AgreementRequests /></AdminRoute>,
                handle: { title: 'Agreement Requests' }
            },
            {
                path: 'manage-coupons',
                element: <AdminRoute><ManageCoupons /></AdminRoute>,
                handle: { title: 'Manage Coupons' }
            },
        ],
    },
    // 404 pages
    {
        path: '*',
        element: <NotFound />,
        handle: { title: 'Page Not Found' }
    }
]);