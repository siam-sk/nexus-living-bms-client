import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { UsersIcon, BuildingOffice2Icon, ChartPieIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// A completely redesigned, more visually appealing StatCard
const StatCard = ({ icon, title, value, gradientClass }) => (
    <div className={`relative p-6 rounded-2xl shadow-lg text-white overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ${gradientClass}`}>
        <div className="relative z-10 flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-lg font-medium opacity-80">{title}</p>
                <p className="text-4xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading, isError, error } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-12">
            {/* New Header Banner */}
            <div className="relative rounded-2xl shadow-xl overflow-hidden">
                <img src="https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Tech Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                <div className="relative p-8 flex flex-col sm:flex-row items-center gap-6 text-white">
                    <div className="avatar">
                        <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            <img src={user?.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} alt="Admin profile" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">Welcome Back, {user?.displayName || 'Admin'}!</h1>
                        <p className="text-lg text-white/70 mt-1">Here is the summary of your building management.</p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div>
                <h2 className="text-3xl font-bold text-primary mb-8">Building Overview</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : isError ? (
                    <div role="alert" className="alert alert-error max-w-2xl mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error! Could not load stats. {error.message}</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        <StatCard
                            icon={<BuildingOffice2Icon className="w-8 h-8" />}
                            title="Total Rooms"
                            value={stats.totalRooms}
                            gradientClass="bg-gradient-to-br from-primary to-blue-500"
                        />
                        <StatCard
                            icon={<ChartPieIcon className="w-8 h-8" />}
                            title="Available Rooms"
                            value={`${stats.availablePercentage}%`}
                            gradientClass="bg-gradient-to-br from-primary to-blue-500"
                        />
                        <StatCard
                            icon={<ChartPieIcon className="w-8 h-8" />}
                            title="Unavailable Rooms"
                            value={`${stats.unavailablePercentage}%`}
                            gradientClass="bg-gradient-to-br from-primary to-blue-500"
                        />
                        <StatCard
                            icon={<UsersIcon className="w-8 h-8" />}
                            title="Total Users"
                            value={stats.totalUsers}
                            gradientClass="bg-gradient-to-br from-primary to-blue-500"
                        />
                        <StatCard
                            icon={<UserGroupIcon className="w-8 h-8" />}
                            title="Total Members"
                            value={stats.totalMembers}
                            gradientClass="bg-gradient-to-br from-primary to-blue-500"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;