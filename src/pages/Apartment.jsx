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
      axiosSecure
        .post('/agreements', agreementData)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success('Agreement request submitted successfully!', { id: toastId });
          } else {
            toast.success('Request submitted.', { id: toastId });
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || 'Failed to submit request.', { id: toastId });
        });
    } else {
      toast.error('You must be logged in to make an agreement.');
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  return (
    <div className="group card bg-base-100 border border-base-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <figure className="h-48 relative">
        <img src={image} alt={`Apartment ${apartment_no}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge badge-neutral badge-sm">Block {block_name}</span>
          <span className="badge badge-ghost badge-sm bg-base-100/80">Floor {floor_no}</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="px-2 py-1 rounded-md bg-base-100/90 text-primary font-semibold shadow">
            ${rent}/mo
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">Apartment {apartment_no}</h2>
        <p className="text-base-content/70">Comfortable living with curated amenities and great connectivity.</p>
        <div className="card-actions justify-between items-center pt-2">
          <div className="flex gap-2">
            <span className="badge badge-outline">Elevator</span>
            <span className="badge badge-outline">Balcony</span>
            <span className="badge badge-outline">24/7</span>
          </div>
          <button onClick={handleAgreement} className="btn btn-primary btn-sm">Request</button>
        </div>
      </div>
    </div>
  );
};

const Apartment = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [appliedQuery, setAppliedQuery] = useState({ min: '', max: '' });
  const [selectedRange, setSelectedRange] = useState('');
  const [selectedSort, setSelectedSort] = useState('rent-asc');
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const axiosSecure = useAxiosSecure();

  const sortMap = {
    'rent-asc': { sortBy: 'rent', sortOrder: 'asc' },
    'rent-desc': { sortBy: 'rent', sortOrder: 'desc' },
    'floor_no-asc': { sortBy: 'floor_no', sortOrder: 'asc' },
    'floor_no-desc': { sortBy: 'floor_no', sortOrder: 'desc' },
    'block_name-asc': { sortBy: 'block_name', sortOrder: 'asc' },
    'block_name-desc': { sortBy: 'block_name', sortOrder: 'desc' },
  };

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['apartments', currentPage, appliedQuery, selectedSort, itemsPerPage],
    queryFn: async () => {
      const { sortBy, sortOrder } = sortMap[selectedSort] || sortMap['rent-asc'];
      const res = await axiosSecure.get('/apartments', {
        params: {
          page: currentPage,
          size: itemsPerPage,
          minRent: appliedQuery.min,
          maxRent: appliedQuery.max,
          sortBy,
          sortOrder,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const apartments = data?.apartments || [];
  const count = data?.count ?? 0;

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

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    setCurrentPage(0);
  };

  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  const SkeletonCard = () => (
    <div className="card bg-base-100 border border-base-200 animate-pulse">
      <div className="h-48 bg-base-200" />
      <div className="card-body">
        <div className="h-5 w-2/3 bg-base-200 rounded" />
        <div className="h-4 w-full bg-base-200 rounded mt-2" />
        <div className="h-4 w-4/5 bg-base-200 rounded mt-2" />
        <div className="flex justify-between mt-4">
          <div className="h-8 w-24 bg-base-200 rounded" />
          <div className="h-8 w-20 bg-base-200 rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Available Apartments</h1>
        <p className="text-base-content/70 mt-2 max-w-2xl">
          Find your perfect home. Filter and sort to match your lifestyle and budget.
        </p>
      </div>

      {/* Toolbar: Filter + Sort + Page size */}
      <div className="mb-8 bg-base-100 border border-base-200 rounded-xl p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="form-control">
              <label className="label py-0"><span className="label-text font-medium pr-2">Filter by Rent</span></label>
              <select onChange={handleFilterChange} className="select select-bordered w-56" value={selectedRange}>
                {rentRanges.map((range) => (
                  <option key={range.label} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label py-0"><span className="label-text font-medium pr-2">Sort by</span></label>
              <select value={selectedSort} onChange={handleSortChange} className="select select-bordered w-56">
                <option value="rent-asc">Rent: Low to High</option>
                <option value="rent-desc">Rent: High to Low</option>
                <option value="floor_no-asc">Floor: Low to High</option>
                <option value="floor_no-desc">Floor: High to Low</option>
                <option value="block_name-asc">Block: A → Z</option>
                <option value="block_name-desc">Block: Z → A</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label py-0"><span className="label-text font-medium pr-2">Per page</span></label>
            <select value={itemsPerPage} onChange={handlePageSizeChange} className="select select-bordered w-32">
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>

        <div className="mt-3 text-sm text-base-content/60">
          {isFetching ? 'Updating results…' : `Showing ${Math.min(currentPage * itemsPerPage + 1, count)}–${Math.min((currentPage + 1) * itemsPerPage, count)} of ${count} results`}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="alert alert-error">
          <span>Error fetching apartments: {error.message}</span>
        </div>
      ) : apartments.length === 0 ? (
        <div className="text-center py-24">
          <h3 className="text-2xl font-semibold">No apartments found</h3>
          <p className="text-base-content/70">Try broadening your filters or clearing them.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment._id} apartment={apartment} />
            ))}
          </div>

          {/* Pagination */}
          <div className="text-center mt-10">
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
        </>
      )}
    </div>
  );
};

export default Apartment;