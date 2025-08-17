import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ResponsiveTable from '../../components/ResponsiveTable';

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments/me');
      return res.data || [];
    },
  });

  if (isLoading) return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  const payments = data;

  return (
    <div>
      <h1 className="text-4xl font-bold text-primary mb-8">Payment History</h1>
      <ResponsiveTable
        columns={[
          { header: 'Date', accessor: (r) => new Date(r.date).toLocaleDateString() },
          { header: 'Amount', accessor: (r) => `$${r.amount}` },
          { header: 'Method', accessor: (r) => r.method },
          { header: 'Status', accessor: (r) => (
              <span className={`badge ${r.status === 'paid' ? 'badge-success' : 'badge-ghost'}`}>{r.status}</span>
          ) },
        ]}
        data={payments}
        rowKey={(r) => r._id}
        emptyMessage="No payments yet."
      />
    </div>
  );
}