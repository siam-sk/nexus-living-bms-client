import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { CalendarDaysIcon, BuildingOfficeIcon, MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';

const InfoCard = ({ icon, label, value, gradientClass }) => (
    <div className={`relative p-6 rounded-2xl shadow-lg text-white overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ${gradientClass}`}>
        <div className="relative z-10 flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-full">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-base font-medium opacity-80">{label}</p>
                <p className="text-2xl font-bold truncate">{value}</p>
            </div>
        </div>
    </div>
);

const MyProfile = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: agreementInfo, isLoading: agreementLoading } = useQuery({
    queryKey: ['agreement', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreement/${user.email}`);
      return res.data;
    },
    enabled: !authLoading && !!user?.email,
  });

  const isLoading = authLoading || agreementLoading;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-12">
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : user ? (
        <>
          {/* Profile Header Banner */}
          <div className="relative rounded-2xl shadow-xl overflow-hidden">
            <img src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Modern apartment" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="relative p-8 flex flex-col sm:flex-row items-center gap-6 text-white">
                <div className="avatar">
                    <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                        <img src={user.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} alt="User profile" />
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-bold">{user.displayName || 'User'}</h1>
                    <p className="text-lg text-white/80 mt-1">{user.email}</p>
                </div>
            </div>
          </div>

          {/* Agreement Details Section */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8">Your Residence Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard 
                icon={<CalendarDaysIcon className="w-8 h-8" />}
                label="Agreement Date"
                value={agreementInfo?.agreement_date ? new Date(agreementInfo.agreement_date).toLocaleDateString() : 'none'}
                gradientClass="bg-gradient-to-br from-primary to-blue-500"
              />
              <InfoCard 
                icon={<BuildingOfficeIcon className="w-8 h-8" />}
                label="Floor"
                value={agreementInfo?.floor_no || 'none'}
                gradientClass="bg-gradient-to-br from-primary to-blue-500"
              />
              <InfoCard 
                icon={<MapPinIcon className="w-8 h-8" />}
                label="Block"
                value={agreementInfo?.block_name || 'none'}
                gradientClass="bg-gradient-to-br from-primary to-blue-500"
              />
              <InfoCard 
                icon={<HomeIcon className="w-8 h-8" />}
                label="Room No"
                value={agreementInfo?.apartment_no || 'none'}
                gradientClass="bg-gradient-to-br from-primary to-blue-500"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
            <p className="text-lg text-base-content/70">Could not load profile information.</p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;