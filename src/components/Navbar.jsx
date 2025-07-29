import { useContext } from 'react';
import { Link, NavLink } from "react-router";
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut().catch(err => console.error(err));
    }

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => `uppercase tracking-widest ${isActive ? 'text-accent font-bold underline underline-offset-8' : 'font-normal'}`}>Home</NavLink></li>
            <li><NavLink to="/apartment" className={({ isActive }) => `uppercase tracking-widest ${isActive ? 'text-accent font-bold underline underline-offset-8' : 'font-normal'}`}>Apartment</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4 sm:px-8 py-0 min-h-0 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="flex items-center text-xl sm:text-2xl lg:text-3xl">
                    {/* Stylized Logo SVG */}
                    <svg width="35" height="35" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block">
                        <g transform="translate(100, 100)">
                            <g transform="scale(0.9)">
                                {/* Hexagon Frame */}
                                <path 
                                    d="M 0 -100 L 86.6 -50 L 86.6 50 L 0 100 L -86.6 50 L -86.6 -50 Z" 
                                    className="fill-primary"
                                />
                                {/* House Icon */}
                                <g className="fill-primary-content">
                                    {/* Roof */}
                                    <path d="M -50 -15 L 0 -55 L 50 -15 Z" />
                                    {/* Base */}
                                    <path d="M -40 -15 L -40 50 L 40 50 L 40 -15 Z" />
                                    {/* Door */}
                                    <path d="M -10 50 L -10 20 L 10 20 L 10 50 Z" className="fill-primary opacity-50" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span className="font-bold sm:ml-1">NEXUS LIVING</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3 text-lg">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img alt="User Profile" src={user.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li className="p-2 font-semibold">{user.displayName || 'User'}</li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-sm sm:btn-md btn-primary btn-outline">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;