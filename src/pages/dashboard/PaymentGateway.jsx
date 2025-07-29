import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentGateway = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paymentDetails } = location.state || {};
    const axiosSecure = useAxiosSecure();

    const mutation = useMutation({
        mutationFn: async (paymentData) => {
            const res = await axiosSecure.post('/payments', paymentData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                title: 'Payment Successful!',
                text: `Your payment of $${paymentDetails.rent_to_pay} for ${paymentDetails.month} has been processed.`,
                icon: 'success',
            }).then(() => {
                navigate('/dashboard/payment-history');
            });
        },
        onError: (err) => {
            Swal.fire({
                title: 'Error!',
                text: err.message || 'Could not process payment.',
                icon: 'error',
            });
        }
    });

    if (!paymentDetails) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-error">Invalid Access</h2>
                <p>No payment details provided. Please go back and start the payment process again.</p>
                <button onClick={() => navigate('/dashboard/make-payment')} className="btn btn-primary mt-4">Go Back</button>
            </div>
        );
    }

    const handleConfirmPayment = () => {
        const dataToSave = {
            email: paymentDetails.user_email,
            rent: paymentDetails.rent_to_pay,
            month: paymentDetails.month,
            floor: paymentDetails.floor_no,
            block: paymentDetails.block_name,
            apartment: paymentDetails.apartment_no,
        };
        mutation.mutate(dataToSave);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-8">Complete Your Payment</h1>
            <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
                <div className="card-body">
                    <h2 className="card-title">Payment Summary</h2>
                    <p><strong>Apartment:</strong> Block {paymentDetails.block_name}, Floor {paymentDetails.floor_no}, Room {paymentDetails.apartment_no}</p>
                    <p><strong>Month:</strong> {paymentDetails.month}</p>
                    <div className="text-3xl font-bold text-primary my-4 text-center">
                        Amount to Pay: ${paymentDetails.rent_to_pay}
                    </div>
                    <p className="text-center my-4 text-info">--- Real Payment Gateway (e.g., Stripe Checkout) would be integrated here ---</p>
                    <button 
                        onClick={handleConfirmPayment} 
                        className="btn btn-success"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Processing...' : 'Confirm and Pay'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;