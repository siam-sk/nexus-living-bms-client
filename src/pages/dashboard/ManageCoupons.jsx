import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ResponsiveTable from '../../components/ResponsiveTable';

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
        const couponData = {
            code: (data.code || '').trim().toUpperCase(),
            discount_percentage: parseInt(data.discount_percentage, 10),
            description: data.description,
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
                <button className="btn btn-primary" onClick={() => document.getElementById('add_coupon_modal').showModal()}>
                    Add Coupon
                </button>
            </div>

            <ResponsiveTable
                columns={[
                    { header: 'Coupon Code', accessor: (row) => <span className="font-mono">{row.code}</span> },
                    { header: 'Discount (%)', accessor: (row) => `${row.discount_percentage}%` },
                    { header: 'Description', accessor: (row) => row.description },
                    { header: 'Availability', accessor: (row) => (
                        <span className={`badge ${row.availability === 'available' ? 'badge-success' : 'badge-ghost'}`}>
                          {row.availability}
                        </span>
                    ) },
                ]}
                data={coupons || []}
                rowKey={(row) => row._id}
                actionsHeader="Action"
                renderActions={(row) => (
                    <>
                        <button
                            onClick={() => handleToggleAvailability(row._id)}
                            className="btn btn-secondary btn-sm"
                            disabled={toggleAvailabilityMutation.isPending}
                        >
                            Toggle
                        </button>
                    </>
                )}
                emptyMessage="No coupons found."
            />

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
                            <input
                              type="text"
                              {...register('code', { required: true })}
                              className={`input input-bordered ${errors.code ? 'input-error' : ''}`}
                            />
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