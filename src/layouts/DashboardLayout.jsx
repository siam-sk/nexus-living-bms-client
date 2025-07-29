import { NavLink, Outlet } from 'react-router';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useMember from '../hooks/useMember';
import usePageTitle from '../hooks/usePageTitle';

const DashboardLayout = () => {
    usePageTitle(); // Set page title dynamically
    const { user } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isMember, isMemberLoading] = useMember();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `flex items-center px-4 py-2.5 text-base font-medium rounded-lg transition-all duration-300 ease-in-out hover:bg-secondary hover:text-white ${
            isActive ? 'bg-secondary text-white shadow-lg' : 'text-primary-content/80'
        }`;

    
    const userLinks = (
        <>
            <li>
                <NavLink to="/dashboard/my-profile" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    My Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/announcements" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 01-4.5-4.5v-4.5a4.5 4.5 0 014.5-4.5h7.5a4.5 4.5 0 014.5 4.5v1.5m-4.5-4.5h.008c.088 0 .176.002.26.006M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    Announcements
                </NavLink>
            </li>
        </>
    );

    const memberLinks = (
        <>
            <li>
                <NavLink to="/dashboard/my-profile" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    My Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/make-payment" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z" /></svg>
                    Make Payment
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/payment-history" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Payment History
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/announcements" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 01-4.5-4.5v-4.5a4.5 4.5 0 014.5-4.5h7.5a4.5 4.5 0 014.5 4.5v1.5m-4.5-4.5h.008c.088 0 .176.002.26.006M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    Announcements
                </NavLink>
            </li>
        </>
    );

    const adminLinks = (
        <>
            <li>
                <NavLink to="/dashboard/admin-profile" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Admin Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-members" className={navLinkClass}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-.063 1.14-.094 1.72-.094s1.15.031 1.72.094m-3.44 0a6.672 6.672 0 01-3.44 0m6.88 0c.57.063 1.14.094 1.72.094s1.15.031 1.72.094m-3.44 0a6.672 6.672 0 01-3.44 0" /></svg>
                    Manage Members
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/make-announcement" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 01-4.5-4.5v-4.5a4.5 4.5 0 014.5-4.5h7.5a4.5 4.5 0 014.5 4.5v1.5m-4.5-4.5h.008c.088 0 .176.002.26.006M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    Make Announcement
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/agreement-requests" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    Agreement Requests
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-coupons" className={navLinkClass}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18m-3-12v.75m0 3v.75m0 3v.75m0 3V18m9-12h-3.375a48.872 48.872 0 00-11.25 0H3.75M9 18h6" /></svg>
                    Manage Coupons
                </NavLink>
            </li>
        </>
    );

    const sidebarContent = (
        <>
            <div className="flex items-center gap-4 mb-8 border-b border-primary-content/20 pb-6">
                <div className="avatar">
                    <div className="w-14 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} alt="User" />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-xl">{user?.displayName || 'User'}</h2>
                    <p className="text-sm opacity-70">{isAdmin ? 'Admin' : isMember ? 'Member' : 'Resident'}</p>
                </div>
            </div>

            <ul className="menu space-y-3 flex-grow">
                {isAdminLoading || isMemberLoading ? <span className="loading loading-spinner text-white"></span> : (isAdmin ? adminLinks : (isMember ? memberLinks : userLinks))}
            </ul>

            <div className="divider before:bg-primary-content/20 after:bg-primary-content/20"></div>
            
            <ul className="menu space-y-3">
                <li>
                    <NavLink to="/" className={navLinkClass}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>
                        Home
                    </NavLink>
                </li>
            </ul>
        </>
    );

    return (
        <div className="flex min-h-screen bg-base-200">
            {/* Sidebar for larger screens */}
            <div className="w-72 bg-primary text-primary-content p-6 flex-col shadow-2xl hidden lg:flex">
                {sidebarContent}
            </div>

            {/* Mobile Sidebar (Overlay) */}
            <div className={`fixed inset-0 z-40 flex lg:hidden ${isSidebarOpen ? '' : 'pointer-events-none'}`}>
                <div className={`fixed inset-y-0 left-0 w-72 bg-primary text-primary-content p-6 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    {sidebarContent}
                </div>
                <div className={`flex-1 bg-black transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-50' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)}></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <div className="lg:hidden bg-base-100 shadow-md p-2 flex items-center">
                    <button onClick={() => setSidebarOpen(true)} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <h1 className="text-lg font-bold text-primary ml-2">Dashboard</h1>
                </div>
                <main className="p-6 lg:p-10 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;