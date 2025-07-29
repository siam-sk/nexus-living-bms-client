import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [couponCode, setCouponCode] = useState('');
    const [payableRent, setPayableRent] = useState(0);
    const [originalRent, setOriginalRent] = useState(0);

    const { data: agreement, isLoading } = useQuery({
        queryKey: ['agreement', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axiosSecure.get(`/agreement/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    useEffect(() => {
        if (agreement?.rent) {
            setPayableRent(agreement.rent);
            setOriginalRent(agreement.rent);
        }
    }, [agreement]);

    const handleApplyCoupon = async () => {
        if (!couponCode) return Swal.fire('Oops!', 'Please enter a coupon code.', 'warning');
        try {
            const res = await axiosSecure.get(`/coupons/${couponCode}`);
            const coupon = res.data;
            if (coupon) {
                const discount = (originalRent * coupon.discount_percentage) / 100;
                setPayableRent(originalRent - discount);
                Swal.fire('Success!', `Coupon applied! You get a ${coupon.discount_percentage}% discount.`, 'success');
            } else {
                setPayableRent(originalRent);
                Swal.fire('Invalid Coupon', 'The coupon code you entered is not valid.', 'error');
            }
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        }
    };

    const onSubmit = (data) => {
        const paymentDetails = {
            ...agreement,
            rent_to_pay: payableRent,
            month: data.month,
        };
        navigate('/dashboard/payment-gateway', { state: { paymentDetails } });
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (isLoading) return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (!agreement) return <div className="text-center text-xl">You do not have an active agreement.</div>;

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-8">Make Payment</h1>
            <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="text" value={agreement.user_email} className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Floor</span></label>
                            <input type="text" value={agreement.floor_no} className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Block Name</span></label>
                            <input type="text" value={agreement.block_name} className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Apartment No.</span></label>
                            <input type="text" value={agreement.apartment_no} className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Rent</span></label>
                            <input type="text" value={`$${payableRent}`} className="input input-bordered text-lg font-bold" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Select Month</span></label>
                            <select {...register('month', { required: true })} className={`select select-bordered ${errors.month ? 'select-error' : ''}`}>
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="divider">Apply Coupon</div>
                    <div className="form-control flex-row gap-2">
                        <input type="text" placeholder="Enter coupon code" className="input input-bordered flex-grow" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        <button type="button" onClick={handleApplyCoupon} className="btn btn-secondary">Apply</button>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Pay Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakePayment;