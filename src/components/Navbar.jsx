import { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    const dashboardPath = isAdmin ? '/dashboard/admin-profile' : '/dashboard/my-profile';

    const onHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        logOut().catch(err => console.error(err));
    }

    const navLinkClass = ({ isActive }) => {
        const baseStyle = 'uppercase tracking-widest transition-colors duration-300';
        const activeStyle = onHomePage && !isScrolled 
            ? 'text-white font-bold underline underline-offset-8' 
            : 'text-accent font-bold underline underline-offset-8';
        const inactiveStyle = onHomePage && !isScrolled 
            ? 'font-normal text-white/80 hover:text-white' 
            : 'font-normal hover:text-accent';
        
        return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
    };

    const navbarClasses = `navbar fixed top-0 z-50 transition-all duration-300 px-4 sm:px-8 py-0 min-h-0 ${
        isScrolled || !onHomePage ? 'bg-base-100 shadow-md' : 'bg-transparent'
    }`;

    const logoTextColor = isScrolled || !onHomePage ? 'text-primary' : 'text-white';
    const logoFillColor = isScrolled || !onHomePage ? 'fill-primary' : 'fill-white';

    return (
        <div className={navbarClasses}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className={`btn btn-ghost lg:hidden ${onHomePage && !isScrolled ? 'text-white' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {/* Dropdown links will use standard colors */}
                        <li><NavLink to="/" className={({ isActive }) => `text-base uppercase tracking-widest ${isActive ? 'text-accent font-bold' : 'font-normal'}`}>Home</NavLink></li>
                        <li><NavLink to="/apartment" className={({ isActive }) => `text-base uppercase tracking-widest ${isActive ? 'text-accent font-bold' : 'font-normal'}`}>Apartment</NavLink></li>
                    </ul>
                </div>
                <Link to="/" className="flex items-center text-xl sm:text-2xl lg:text-3xl group">
                    {/* Stylized Logo SVG */}
                    <svg width="35" height="35" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block">
                        <g transform="translate(100, 100)">
                            <g transform="scale(0.9)">
                                {/* Hexagon Frame */}
                                <path 
                                    d="M 0 -100 L 86.6 -50 L 86.6 50 L 0 100 L -86.6 50 L -86.6 -50 Z" 
                                    className={`${logoFillColor} transition-colors duration-300`}
                                />
                                {/* House Icon */}
                                <g className={isScrolled || !onHomePage ? 'fill-primary-content' : 'fill-primary'}>
                                    {/* Roof */}
                                    <path d="M -50 -15 L 0 -55 L 50 -15 Z" />
                                    {/* Base */}
                                    <path d="M -40 -15 L -40 50 L 40 50 L 40 -15 Z" />
                                    {/* Door */}
                                    <path d="M -10 50 L -10 20 L 10 20 L 10 50 Z" className={`${logoFillColor} opacity-50`} />
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span className={`font-bold sm:ml-1 transition-colors duration-300 ${logoTextColor}`}>NEXUS LIVING</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3 text-lg">
                    <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                    <li><NavLink to="/apartment" className={navLinkClass}>Apartment</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className={`w-8 sm:w-10 rounded-full ring ring-offset-base-100 ring-offset-2 transition-all duration-300 ${isScrolled || !onHomePage ? 'ring-primary' : 'ring-white'}`}>
                                <img alt="User Profile" src={user.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-base">
                            <li className="p-2 font-semibold">{user.displayName || 'User'}</li>
                            <li><Link to={dashboardPath}>Dashboard</Link></li>
                            <li>
                                <button onClick={handleLogout} className="btn btn-ghost justify-start">Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className={`btn btn-sm border-accent text-accent sm:btn-md transition-colors duration-300 ${isScrolled || !onHomePage ? 'btn-primary btn-outline' : 'btn-outline text-white border-white hover:bg-white hover:text-primary'}`}>
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;