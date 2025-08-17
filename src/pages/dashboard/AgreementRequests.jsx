import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ResponsiveTable from '../../components/ResponsiveTable';

const AgreementRequests = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const { data: requests, isLoading, isError, error } = useQuery({
        queryKey: ['pendingAgreements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreements');
            return res.data;
        },
    });

    const useHandleMutation = (mutationFn, successText) => {
        return useMutation({
            mutationFn,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['pendingAgreements'] });
                Swal.fire('Success!', successText, 'success');
            },
            onError: (err) => {
                Swal.fire('Error!', err.message, 'error');
            },
        });
    };

    const acceptMutation = useHandleMutation(async (id) => {
        const res = await axiosSecure.patch(`/agreements/accept/${id}`);
        return res.data;
    }, 'Agreement accepted and user role updated to member.');
    
    const rejectMutation = useHandleMutation(async (id) => {
        const res = await axiosSecure.patch(`/agreements/reject/${id}`);
        return res.data;
    }, 'Agreement has been rejected.');

    const handleAccept = (id) => {
        acceptMutation.mutate(id);
    };

    const handleReject = (id) => {
        rejectMutation.mutate(id);
    };

    if (isLoading) return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (isError) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-8">Agreement Requests</h1>

            <ResponsiveTable
                columns={[
                    { header: 'User Name', accessor: (row) => row.user_name },
                    { header: 'User Email', accessor: (row) => <span className="break-all">{row.user_email}</span> },
                    { header: 'Apartment Info', accessor: (row) => <>Block: {row.block_name}, Floor: {row.floor_no}, Room: {row.apartment_no}</> },
                    { header: 'Rent', accessor: (row) => `$${row.rent}` },
                    { header: 'Request Date', accessor: (row) => new Date(row.request_date).toLocaleDateString() },
                ]}
                data={requests || []}
                rowKey={(row) => row._id}
                actionsHeader="Actions"
                renderActions={(row) => (
                    <>
                        <button
                            onClick={() => handleAccept(row._id)}
                            className="btn btn-success btn-sm text-white"
                            disabled={acceptMutation.isPending}
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleReject(row._id)}
                            className="btn btn-error btn-sm text-white"
                            disabled={rejectMutation.isPending}
                        >
                            Reject
                        </button>
                    </>
                )}
                emptyMessage="No requests found."
            />
        </div>
    );
};

export default AgreementRequests;