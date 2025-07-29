import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider';

// Function to fetch admin stats
const fetchAdminStats = async () => {
    const res = await fetch('http://localhost:5000/admin-stats');
    if (!res.ok) {
        throw new Error('Failed to fetch admin statistics');
    }
    return res.json();
};

const AdminProfile = () => {
    const { user } = useContext(AuthContext);

    const { data: stats, isLoading, isError, error } = useQuery({
        queryKey: ['adminStats'],
        queryFn: fetchAdminStats,
    });

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

            {/* Admin Info Card */}
            <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto mb-10">
                <div className="relative w-full lg:w-1/3">
                    <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Admin Office" className="object-cover w-full h-48 lg:h-full rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" />
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 lg:-right-12 lg:top-1/2 lg:-translate-y-1/2 lg:left-auto">
                        <div className="avatar">
                            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                                <img src={user?.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} alt="Admin profile" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body pt-20 lg:pt-8 lg:pl-20">
                    <h2 className="card-title text-3xl">{user?.displayName || 'Admin'}</h2>
                    <p className="text-base-content/70">{user?.email}</p>
                </div>
            </div>

            {/* Stats Section */}
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">Building Overview</h2>
            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : isError ? (
                <div className="text-red-500 text-center">Error: {error.message}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                    <div className="stat bg-base-100 shadow-lg rounded-lg">
                        <div className="stat-title">Total Rooms</div>
                        <div className="stat-value text-primary">{stats.totalRooms}</div>
                    </div>
                    <div className="stat bg-base-100 shadow-lg rounded-lg">
                        <div className="stat-title">Available Rooms</div>
                        <div className="stat-value text-success">{stats.availablePercentage}%</div>
                    </div>
                    <div className="stat bg-base-100 shadow-lg rounded-lg">
                        <div className="stat-title">Unavailable Rooms</div>
                        <div className="stat-value text-error">{stats.unavailablePercentage}%</div>
                    </div>
                    <div className="stat bg-base-100 shadow-lg rounded-lg">
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value">{stats.totalUsers}</div>
                    </div>
                    <div className="stat bg-base-100 shadow-lg rounded-lg">
                        <div className="stat-title">Total Members</div>
                        <div className="stat-value">{stats.totalMembers}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;