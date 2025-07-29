import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

// Fetch pending agreements
const fetchPendingAgreements = async () => {
    const res = await fetch('http://localhost:5000/agreements');
    if (!res.ok) throw new Error('Failed to fetch agreement requests');
    return res.json();
};

// API call function for accepting
const acceptAgreement = async (id) => {
    const res = await fetch(`http://localhost:5000/agreements/accept/${id}`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to accept agreement');
    return res.json();
};

// API call function for rejecting
const rejectAgreement = async (id) => {
    const res = await fetch(`http://localhost:5000/agreements/reject/${id}`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to reject agreement');
    return res.json();
};

const AgreementRequests = () => {
    const queryClient = useQueryClient();

    const { data: requests, isLoading, isError, error } = useQuery({
        queryKey: ['pendingAgreements'],
        queryFn: fetchPendingAgreements,
    });

    const handleMutation = (mutationFn, successText) => {
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

    const acceptMutation = handleMutation(acceptAgreement, 'Agreement accepted and user role updated to member.');
    const rejectMutation = handleMutation(rejectAgreement, 'Agreement has been rejected.');

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
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Apartment Info</th>
                            <th>Rent</th>
                            <th>Request Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <tr key={req._id}>
                                    <td>{req.user_name}</td>
                                    <td>{req.user_email}</td>
                                    <td>Block: {req.block_name}, Floor: {req.floor_no}, Room: {req.apartment_no}</td>
                                    <td>${req.rent}</td>
                                    <td>{new Date(req.request_date).toLocaleDateString()}</td>
                                    <td className="space-x-2">
                                        <button onClick={() => handleAccept(req._id)} className="btn btn-success btn-sm text-white" disabled={acceptMutation.isPending}>Accept</button>
                                        <button onClick={() => handleReject(req._id)} className="btn btn-error btn-sm text-white" disabled={rejectMutation.isPending}>Reject</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="text-center py-4">No pending agreement requests.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgreementRequests;