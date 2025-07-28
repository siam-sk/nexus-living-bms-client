import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';

const ApartmentCard = ({ apartment }) => {
  const { image, floor_no, block_name, apartment_no, rent } = apartment;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAgreement = () => {
    if (user && user.email) {
      const toastId = toast.loading('Submitting your request...');

      const agreementData = {
        user_name: user.displayName,
        user_email: user.email,
        floor_no,
        block_name,
        apartment_no,
        rent,
        status: 'pending',
      };

      fetch('http://localhost:5000/agreements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agreementData),
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => { throw new Error(err.message) });
          }
          return res.json();
        })
        .then(data => {
          if (data.insertedId) {
            toast.success('Agreement request submitted successfully!', { id: toastId });
          }
        })
        .catch(error => {
          toast.error(error.message || 'Failed to submit request.', { id: toastId });
        });
    } else {
      toast.error('You must be logged in to make an agreement.');
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl transition-transform transform hover:-translate-y-2">
      <figure>
        <img
          src={image}
          alt={`View of apartment ${apartment_no}`}
          className="w-full h-56 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          Apartment {apartment_no}
        </h2>
        <div className="my-2">
          <p className="text-base-content/80">
            <span className="font-semibold">Block:</span> {block_name}
          </p>
          <p className="text-base-content/80">
            <span className="font-semibold">Floor:</span> {floor_no}
          </p>
        </div>
        <p className="text-xl font-bold text-primary">Rent: ${rent}/month</p>
        <div className="card-actions justify-end mt-4">
          <button onClick={handleAgreement} className="btn btn-primary">Agreement</button>
        </div>
      </div>
    </div>
  );
};

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/apartments')
      .then((res) => res.json())
      .then((data) => {
        setApartments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch apartments:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Available Apartments
        </h1>
        <p className="text-lg text-base-content/70 mt-2 max-w-2xl mx-auto">
          Find your perfect home. Explore our available apartments and choose the
          one that fits your lifestyle.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment._id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default Apartment;