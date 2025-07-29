import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageCoupons = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const { data: coupons, isLoading, isError, error } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupons');
            return res.data;
        },
    });

    const addCouponMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post('/coupons', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coupons'] });
            reset();
            document.getElementById('add_coupon_modal').close();
            Swal.fire('Success!', 'New coupon has been added.', 'success');
        },
        onError: (err) => {
            Swal.fire('Error!', err.message, 'error');
        },
    });

    const toggleAvailabilityMutation = useMutation({
        mutationFn: async (couponId) => {
            const res = await axiosSecure.patch(`/coupons/toggle/${couponId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coupons'] });
            toast.success('Coupon status updated!');
        },
        onError: (err) => {
            toast.error(err.message || 'Could not update coupon status.');
        }
    });

    const onSubmit = (data) => {
        // Convert percentage to a number
        const couponData = {
            ...data,
            discount_percentage: parseInt(data.discount_percentage, 10),
        };
        addCouponMutation.mutate(couponData);
    };

    const handleToggleAvailability = (couponId) => {
        toggleAvailabilityMutation.mutate(couponId);
    };

    if (isLoading) return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (isError) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-primary">Manage Coupons</h1>
                <button className="btn btn-primary" onClick={() => document.getElementById('add_coupon_modal').showModal()}>Add Coupon</button>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                <table className="table">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Coupon Code</th>
                            <th>Discount Percentage</th>
                            <th>Description</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.length > 0 ? (
                            coupons.map((coupon) => (
                                <tr key={coupon._id} className="hover">
                                    <td className="font-mono bg-base-200 text-accent font-bold">{coupon.coupon_code}</td>
                                    <td>{coupon.discount_percentage}%</td>
                                    <td>{coupon.description}</td>
                                    <td>
                                        <span className={`badge ${coupon.availability === 'available' ? 'badge-success' : 'badge-error'}`}>
                                            {coupon.availability}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => handleToggleAvailability(coupon._id)}
                                            className={`btn btn-sm ${coupon.availability === 'available' ? 'btn-warning' : 'btn-info'}`}
                                            disabled={toggleAvailabilityMutation.isPending}
                                        >
                                            {coupon.availability === 'available' ? 'Make Unavailable' : 'Make Available'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="text-center py-4">No coupons found. Add one to get started!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Coupon Modal */}
            <dialog id="add_coupon_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Add a New Coupon</h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Coupon Code</span></label>
                            <input type="text" {...register('coupon_code', { required: true })} className={`input input-bordered ${errors.coupon_code ? 'input-error' : ''}`} />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Discount Percentage (%)</span></label>
                            <input type="number" {...register('discount_percentage', { required: true, min: 1, max: 100 })} className={`input input-bordered ${errors.discount_percentage ? 'input-error' : ''}`} />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Coupon Description</span></label>
                            <textarea {...register('description', { required: true })} className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={addCouponMutation.isPending}>
                            {addCouponMutation.isPending ? 'Adding...' : 'Add Coupon'}
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ManageCoupons;