import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { CalendarDaysIcon, BuildingOfficeIcon, MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

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
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ phone: '', address: '' });

  const { data: profile, isLoading: profileLoading, refetch } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: agreementInfo, isLoading: agreementLoading } = useQuery({
    queryKey: ['agreement', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreement/${user.email}`);
      return res.data;
    },
    enabled: !authLoading && !!user?.email,
  });

  const startEdit = () => {
    setForm({ phone: profile?.phone || '', address: profile?.address || '' });
    setIsEditing(true);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Saving profile...');
    try {
      await axiosSecure.put(`/user/${user.email}`, form);
      toast.success('Profile updated', { id: toastId });
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save', { id: toastId });
    }
  };

  const isLoading = authLoading || profileLoading || agreementLoading;

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

          {/* Contact & Identity */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6 bg-base-100 border border-base-200">
                <div className="text-sm text-base-content/60">Name</div>
                <div className="text-xl font-semibold">{user?.displayName || '—'}</div>
              </div>
              <div className="rounded-2xl p-6 bg-base-100 border border-base-200">
                <div className="text-sm text-base-content/60">Email</div>
                <div className="text-xl font-semibold break-all">{user?.email || '—'}</div>
              </div>
              <div className="rounded-2xl p-6 bg-base-100 border border-base-200">
                <div className="text-sm text-base-content/60">Phone</div>
                <div className="text-xl font-semibold">{profile?.phone || user?.phoneNumber || '—'}</div>
              </div>
              <div className="rounded-2xl p-6 bg-base-100 border border-base-200 md:col-span-2">
                <div className="text-sm text-base-content/60">Address</div>
                <div className="text-xl font-semibold">{profile?.address || '—'}</div>
              </div>
            </div>
            <div className="mt-4">
              <button onClick={startEdit} className="btn btn-primary btn-sm">Edit Profile</button>
            </div>
          </div>

          {/* Edit Modal */}
          {isEditing && (
            <dialog open className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
                <form onSubmit={saveEdit} className="space-y-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text">Phone</span></label>
                    <input
                      type="tel"
                      className="input input-bordered"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Address</span></label>
                    <textarea
                      className="textarea textarea-bordered"
                      rows={3}
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    />
                  </div>
                  <div className="modal-action">
                    <button type="button" className="btn btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
              <form method="dialog" className="modal-backdrop" onClick={() => setIsEditing(false)}>
                <button>close</button>
              </form>
            </dialog>
          )}
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