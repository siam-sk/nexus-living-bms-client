import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ResponsiveTable from '../../components/ResponsiveTable';

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: members, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/members');
            return res.data;
        },
    });

    const mutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.patch(`/users/member/${userId}`);
            return res.data;
        },
        onSuccess: () => {
            refetch();
            Swal.fire({
                title: 'Success!',
                text: 'Member has been removed and their role is now "user".',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
        },
        onError: (err) => {
            Swal.fire({
                title: 'Error!',
                text: err.message || 'Could not remove member.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    });

    const handleRemoveMember = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will change the member's role to 'user' and they will lose access to the member dashboard.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove them!'
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(userId);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Error fetching members: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-8">Manage Members</h1>

            <ResponsiveTable
                columns={[
                    { header: '#', accessor: (_row, i) => i + 1 },
                    { header: 'User Name', accessor: (row) => row.name },
                    { header: 'User Email', accessor: (row) => <span className="break-all">{row.email}</span> },
                ]}
                data={members || []}
                rowKey={(row) => row._id}
                actionsHeader="Action"
                renderActions={(row) => (
                    <button
                        onClick={() => handleRemoveMember(row._id)}
                        className="btn btn-error btn-sm text-white"
                        disabled={mutation.isPending}
                    >
                        Remove
                    </button>
                )}
                emptyMessage="No members found."
            />
        </div>
    );
};

export default ManageMembers;