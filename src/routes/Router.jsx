import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Apartment from '../pages/Apartment';
import DashboardLayout from '../layouts/DashboardLayout';
import MyProfile from '../pages/dashboard/MyProfile';
import Announcements from '../pages/dashboard/Announcements';
import MakePayment from '../pages/dashboard/MakePayment';
import PaymentHistory from '../pages/dashboard/PaymentHistory';
import AdminProfile from '../pages/dashboard/AdminProfile';
import ManageMembers from '../pages/dashboard/ManageMembers';
import MakeAnnouncement from '../pages/dashboard/MakeAnnouncement';
import AgreementRequests from '../pages/dashboard/AgreementRequests';
import ManageCoupons from '../pages/dashboard/ManageCoupons';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import PaymentGateway from '../pages/dashboard/PaymentGateway';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/apartment', element: <Apartment /> },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // User & Member routes
            { path: 'my-profile', element: <MyProfile /> },
            { path: 'announcements', element: <Announcements /> },
            // Member only routes
            { path: 'make-payment', element: <MakePayment /> },
            { path: 'payment-history', element: <PaymentHistory /> },
            { path: 'payment-gateway', element: <PaymentGateway /> },
            // Admin only routes
            { path: 'admin-profile', element: <AdminRoute><AdminProfile /></AdminRoute> },
            { path: 'manage-members', element: <AdminRoute><ManageMembers /></AdminRoute> },
            { path: 'make-announcement', element: <AdminRoute><MakeAnnouncement /></AdminRoute> },
            { path: 'agreement-requests', element: <AdminRoute><AgreementRequests /></AdminRoute> },
            { path: 'manage-coupons', element: <AdminRoute><ManageCoupons /></AdminRoute> },
        ],
    },
    // 404 pages
    {
        path: '*',
        element: <NotFound />
    }
]);