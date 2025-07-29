import { NavLink, Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);

    const navLinkClass = ({ isActive }) =>
        `flex items-center px-4 py-2.5 text-base font-medium rounded-lg transition-all duration-300 ease-in-out hover:bg-secondary hover:text-white ${
            isActive ? 'bg-secondary text-white shadow-lg' : 'text-primary-content/80'
        }`;

    return (
        <div className="flex min-h-screen bg-base-200">
            {/* Sidebar */}
            <div className="w-72 bg-primary text-primary-content p-6 flex flex-col shadow-2xl">
                <div className="flex items-center gap-4 mb-8 border-b border-primary-content/20 pb-6">
                    <div className="avatar">
                        <div className="w-14 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} alt="User" />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl">{user?.displayName || 'User'}</h2>
                        <p className="text-sm opacity-70">Resident</p>
                    </div>
                </div>

                <ul className="menu space-y-3 flex-grow">
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
                </ul>

                <div className="divider before:bg-primary-content/20 after:bg-primary-content/20"></div>
                
                <ul className="menu space-y-3">
                    <li>
                        <NavLink to="/" className={navLinkClass}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>
                            Home
                        </NavLink>
                    </li>
                     <li>
                        <NavLink to="/apartment" className={navLinkClass}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                            Apartment
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Content Area */}
            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;