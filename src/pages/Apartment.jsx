import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ApartmentCard = ({ apartment }) => {
  const { image, floor_no, block_name, apartment_no, rent } = apartment;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

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
        request_date: new Date(),
      };

      axiosSecure.post('/agreements', agreementData)
        .then(res => {
          if (res.data.insertedId) {
            toast.success('Agreement request submitted successfully!', { id: toastId });
          }
        })
        .catch(error => {
          toast.error(error.response?.data?.message || 'Failed to submit request.', { id: toastId });
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
  const [currentPage, setCurrentPage] = useState(0);
  const [appliedQuery, setAppliedQuery] = useState({ min: '', max: '' });
  const [selectedRange, setSelectedRange] = useState('');
  const itemsPerPage = 6;
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['apartments', currentPage, appliedQuery],
    queryFn: async () => {
      const res = await axiosSecure.get('/apartments', {
        params: {
          page: currentPage,
          size: itemsPerPage,
          minRent: appliedQuery.min,
          maxRent: appliedQuery.max,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const apartments = data?.apartments || [];
  const count = data?.count || 0;

  const rentRanges = [
    { label: 'All Prices', value: '' },
    { label: '$0 - $1250', value: '0-1250' },
    { label: '$1251 - $1500', value: '1251-1500' },
    { label: '$1501+', value: '1501-999999' },
  ];

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleFilterChange = (e) => {
    const currentSelectedRange = e.target.value;
    setSelectedRange(currentSelectedRange);

    if (currentSelectedRange) {
      const [min, max] = currentSelectedRange.split('-');
      setAppliedQuery({ min, max });
    } else {
      setAppliedQuery({ min: '', max: '' });
    }
    setCurrentPage(0); 
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">Error fetching apartments: {error.message}</div>;
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

      {/* Search Section */}
      <div className="mb-12 p-6 bg-base-200 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <h3 className="text-xl font-semibold mb-2 md:mb-0">Filter by Rent:</h3>
          <div className="form-control w-full md:w-auto">
            <select
              onChange={handleFilterChange}
              className="select select-bordered w-full max-w-xs"
              value={selectedRange}
            >
              {rentRanges.map((range) => (
                <option key={range.label} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment._id} apartment={apartment} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="text-center mt-12">
        <div className="join">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`join-item btn ${currentPage === pageNumber ? 'btn-primary' : ''}`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apartment;