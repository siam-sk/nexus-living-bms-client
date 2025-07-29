import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

// Function to fetch members
const fetchMembers = async () => {
    const res = await fetch('http://localhost:5000/users/members');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

// Function to remove a member (change role to user)
const removeMember = async (userId) => {
    const res = await fetch(`http://localhost:5000/users/member/${userId}`, {
        method: 'PATCH',
    });
    if (!res.ok) {
        throw new Error('Failed to update user role');
    }
    return res.json();
};

const ManageMembers = () => {
    const queryClient = useQueryClient();

    const { data: members, isLoading, isError, error } = useQuery({
        queryKey: ['members'],
        queryFn: fetchMembers,
    });

    const mutation = useMutation({
        mutationFn: removeMember,
        onSuccess: () => {
            // Invalidate and refetch the members query to update the list
            queryClient.invalidateQueries({ queryKey: ['members'] });
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
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                <table className="table">
                    <thead className="bg-base-200">
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length > 0 ? (
                            members.map((member, index) => (
                                <tr key={member._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRemoveMember(member._id)}
                                            className="btn btn-error btn-sm text-white"
                                            disabled={mutation.isPending}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No members found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMembers;