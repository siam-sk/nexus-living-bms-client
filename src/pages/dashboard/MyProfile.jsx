import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [agreementInfo, setAgreementInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/agreements/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setAgreementInfo(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-primary mb-8">My Profile</h1>
      {user ? (
        <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto">
          <div className="relative w-full lg:w-1/3">
            <img src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Building" className="object-cover w-full h-48 lg:h-full rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" />
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 lg:-right-12 lg:top-1/2 lg:-translate-y-1/2 lg:left-auto">
              <div className="avatar">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img src={user.photoURL || 'https://i.ibb.co/1zShS2c/default-avatar-icon-of-social-media-user-vector.jpg'} alt="User profile" />
                </div>
              </div>
            </div>
          </div>
          <div className="card-body pt-20 lg:pt-8 lg:pl-20">
            <h2 className="card-title text-3xl">{user.displayName || 'User'}</h2>
            <p className="text-base-content/70">{user.email}</p>
            <div className="divider"></div>
            {loading ? <span className="loading loading-spinner text-primary"></span> :
              <div className="space-y-4">
                <div><span className="font-bold">Agreement Accept Date:</span> {agreementInfo?.agreement_date || 'none'}</div>
                <div><span className="font-bold">Floor:</span> {agreementInfo?.floor_no || 'none'}</div>
                <div><span className="font-bold">Block:</span> {agreementInfo?.block_name || 'none'}</div>
                <div><span className="font-bold">Room No:</span> {agreementInfo?.apartment_no || 'none'}</div>
              </div>
            }
          </div>
        </div>
      ) : (
        <p>Loading profile information...</p>
      )}
    </div>
  );
};

export default MyProfile;