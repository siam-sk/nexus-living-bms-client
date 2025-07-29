import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: payments, isLoading, isError, error } = useQuery({
        queryKey: ['paymentHistory', user?.email, searchTerm],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/payments/${user.email}`, {
                params: { month: searchTerm }
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(search);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (isError) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-8">Payment History</h1>

            <form onSubmit={handleSearch} className="mb-8 max-w-md">
                <div className="form-control">
                    <label className="label"><span className="label-text">Search by Month</span></label>
                    <div className="join">
                        <input
                            type="text"
                            placeholder="e.g., July"
                            className="input input-bordered join-item w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary join-item">Search</button>
                    </div>
                </div>
            </form>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Month</th>
                            <th>Amount Paid</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments && payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.month}</td>
                                    <td>${payment.rent}</td>
                                    <td className="font-mono text-sm">{payment.transaction_id}</td>
                                    <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    {searchTerm ? `No payments found for "${searchTerm}".` : "You have no payment history yet."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;