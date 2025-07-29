import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { BuildingOfficeIcon, MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [couponCode, setCouponCode] = useState('');
    const [payableRent, setPayableRent] = useState(0);
    const [originalRent, setOriginalRent] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);

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
            const rent = agreement.rent;
            setPayableRent(rent);
            setOriginalRent(rent);
            setValue('rent', rent);
        }
    }, [agreement, setValue]);

    const handleApplyCoupon = async () => {
        if (!couponCode) return Swal.fire('Oops!', 'Please enter a coupon code.', 'warning');
        try {
            const res = await axiosSecure.get(`/coupons/${couponCode}`);
            const coupon = res.data;
            if (coupon && coupon.availability === 'available') {
                const discount = (originalRent * coupon.discount_percentage) / 100;
                setPayableRent(originalRent - discount);
                setDiscountApplied(true);
                Swal.fire('Success!', `Coupon applied! You get a ${coupon.discount_percentage}% discount.`, 'success');
            } else {
                setPayableRent(originalRent);
                setDiscountApplied(false);
                Swal.fire('Invalid Coupon', 'The coupon code is not valid or has expired.', 'error');
            }
        } catch {
            Swal.fire('Error', 'Could not validate coupon.', 'error');
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
    if (!agreement) return <div className="text-center text-xl p-8">You do not have an active agreement to make a payment.</div>;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-4xl font-bold text-primary mb-8">Make Payment</h1>
            <div className="card lg:card-side bg-base-100 shadow-2xl max-w-5xl mx-auto">
                {/* Left Side: Invoice Summary */}
                <div className="card-body lg:w-2/5 bg-base-200/50 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none p-8">
                    <h2 className="text-2xl font-bold mb-4">Bill Summary</h2>
                    <div className="space-y-4 text-base-content/80">
                        <div className="flex items-center gap-3"><BuildingOfficeIcon className="w-6 h-6 text-primary" /><span>Floor: {agreement.floor_no}</span></div>
                        <div className="flex items-center gap-3"><MapPinIcon className="w-6 h-6 text-primary" /><span>Block: {agreement.block_name}</span></div>
                        <div className="flex items-center gap-3"><HomeIcon className="w-6 h-6 text-primary" /><span>Apartment: {agreement.apartment_no}</span></div>
                    </div>
                    <div className="divider my-6"></div>
                    <p className="text-sm text-base-content/60">Amount to Pay</p>
                    <p className="text-5xl font-bold text-primary">${payableRent.toFixed(2)}</p>
                    {discountApplied && (
                        <p className="text-sm text-success line-through">Original: ${originalRent.toFixed(2)}</p>
                    )}
                </div>

                {/* Right Side: Payment Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body lg:w-3/5 p-8">
                    <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Select Month for Payment</span></label>
                        <select {...register('month', { required: 'Month is required' })} className={`select select-bordered ${errors.month ? 'select-error' : ''}`}>
                            <option disabled selected>Pick one</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        {errors.month && <label className="label"><span className="label-text-alt text-error">{errors.month.message}</span></label>}
                    </div>

                    <div className="divider mt-8 mb-4">Apply Coupon</div>
                    <label className="label"><span className="label-text">Have a coupon code?</span></label>
                    <div className="form-control flex-row gap-2">
                        <input type="text" placeholder="Enter coupon code" className="input input-bordered flex-grow" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        <button type="button" onClick={handleApplyCoupon} className="btn btn-secondary">Apply</button>
                    </div>

                    <div className="form-control mt-10">
                        <button type="submit" className="btn btn-primary btn-lg">Proceed to Pay</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakePayment;