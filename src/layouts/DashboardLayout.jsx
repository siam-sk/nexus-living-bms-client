import { NavLink, Outlet, Link } from 'react-router';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useMember from '../hooks/useMember';
import usePageTitle from '../hooks/usePageTitle';

const DashboardLayout = () => {
    usePageTitle();
    const { user } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isMember, isMemberLoading] = useMember();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Custom navigation link component
    const NavItem = ({ to, icon, children }) => {
        return (
            <NavLink
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                    `flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                        isActive
                            ? 'bg-accent text-white shadow-lg'
                            : 'text-primary-content/70 hover:bg-secondary/80 hover:text-white'
                    }`
                }
            >
                <span className="mr-3">{icon}</span>
                <span>{children}</span>
            </NavLink>
        );
    };
    
    const userLinks = (
        <>
            <NavItem 
                to="/dashboard/overview" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h7.5M3 6h13.5M3 18h10.5" /></svg>}
            >
                Overview
            </NavItem>
            
            <NavItem 
                to="/dashboard/my-profile" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            >
                My Profile
            </NavItem>
            
            <NavItem 
                to="/dashboard/announcements" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 01-4.5-4.5v-4.5a4.5 4.5 0 014.5-4.5h7.5a4.5 4.5 0 014.5 4.5v1.5m-4.5-4.5h.008c.088 0 .176.002.26.006M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>}
            >
                Announcements
            </NavItem>
        </>
    );

    const memberLinks = (
        <>
            <NavItem 
                to="/dashboard/overview" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h7.5M3 6h13.5M3 18h10.5" /></svg>}
            >
                Overview
            </NavItem>
            
            <NavItem 
                to="/dashboard/my-profile" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            >
                My Profile
            </NavItem>
            
            <NavItem 
                to="/dashboard/make-payment" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z" /></svg>}
            >
                Make Payment
            </NavItem>
            
            <NavItem 
                to="/dashboard/payment-history" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-12 0 9 9 0 0112 0z" /></svg>}
            >
                Payment History
            </NavItem>
            
            <NavItem 
                to="/dashboard/announcements" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 01-4.5-4.5v-4.5a4.5 4.5 0 014.5-4.5h7.5a4.5 4.5 0 014.5 4.5v1.5m-4.5-4.5h.008c.088 0 .176.002.26.006M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>}
            >
                Announcements
            </NavItem>
        </>
    );

    const adminLinks = (
        <>
            <NavItem 
                to="/dashboard/overview" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h7.5M3 6h13.5M3 18h10.5" /></svg>}
            >
                Overview
            </NavItem>
            
            <NavItem 
                to="/dashboard/admin-profile" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            >
                Admin Profile
            </NavItem>
            
            <NavItem 
                to="/dashboard/manage-members" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-.063 1.14-.094 1.72-.094s1.15.031 1.72.094m-3.44 0a6.672 6.672 0 01-3.44 0m6.88 0c.57.063 1.14.094 1.72.094s1.15.031 1.72.094m-3.44 0a6.672 6.672 0 01-3.44 0" /></svg>}
            >
                Manage Members
            </NavItem>
            
            <NavItem 
                to="/dashboard/make-announcement" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 01-4.5-4.5v-4.5a4.5 4.5 0 014.5-4.5h7.5a4.5 4.5 0 014.5 4.5v1.5m-4.5-4.5h.008c.088 0 .176.002.26.006M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>}
            >
                Make Announcement
            </NavItem>
            
            <NavItem 
                to="/dashboard/agreement-requests" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
            >
                Agreement Requests
            </NavItem>
            
            <NavItem 
                to="/dashboard/manage-coupons" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18m-3-12v.75m0 3v.75m0 3v.75m0 3V18m9-12h-3.375a48.872 48.872 0 00-11.25 0H3.75M9 18h6" /></svg>}
            >
                Manage Coupons
            </NavItem>
        </>
    );

    const sidebarContent = (
        <div className="flex flex-col h-full p-4">
            <div className="mb-4">
                <Link to="/" className="flex items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(100, 100) scale(0.9)">
                            <path d="M 0 -100 L 86.6 -50 L 86.6 50 L 0 100 L -86.6 50 L -86.6 -50 Z" className="fill-white" />
                            <g className="fill-primary">
                                <path d="M -50 -15 L 0 -55 L 50 -15 Z" />
                                <path d="M -40 -15 L -40 50 L 40 50 L 40 -15 Z" />
                                <path d="M -10 50 L -10 20 L 10 20 L 10 50 Z" className="fill-white opacity-50" />
                            </g>
                        </g>
                    </svg>
                    <span className="font-bold text-2xl text-white">NEXUS LIVING</span>
                </Link>
            </div>

            <div className="flex items-center gap-4 mb-8 p-2 bg-black/20 rounded-lg">
                <div className="avatar">
                    <div className="w-12 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} alt="User" />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg text-white">{user?.displayName || 'User'}</h2>
                    <p className="text-sm text-white/70">{isAdmin ? 'Admin' : isMember ? 'Member' : 'Resident'}</p>
                </div>
            </div>

            {/* Navigation links - no more menu class */}
            <div className="flex-grow">
                {isAdminLoading || isMemberLoading ? (
                    <div className="flex justify-center mt-10">
                        <span className="loading loading-spinner text-white"></span>
                    </div>
                ) : (
                    <div>
                        {isAdmin ? adminLinks : (isMember ? memberLinks : userLinks)}
                    </div>
                )}
            </div>

            <div className="mt-auto">
                <div className="divider before:bg-primary-content/20 after:bg-primary-content/20"></div>
                <NavItem 
                    to="/" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>}
                >
                    Home
                </NavItem>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-base-200">
            {/* Sidebar for larger screens */}
            <aside className="w-72 bg-primary text-primary-content flex-col shadow-2xl hidden lg:flex">
                {sidebarContent}
            </aside>

            
            {/* Overlay: Sits behind the sidebar */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar: Slides in from the left, on top of the overlay */}
            <aside 
                className={`fixed inset-y-0 left-0 w-72 bg-primary text-primary-content flex-col shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {sidebarContent}
            </aside>
            


            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden bg-base-100 shadow-md p-2 flex items-center sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(true)} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <img src="/favicon.svg" alt="Logo" className="w-8 h-8" />
                        <h1 className="text-lg font-bold text-primary">Dashboard</h1>
                    </div>
                </header>
                <main className="p-6 lg:p-10 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;