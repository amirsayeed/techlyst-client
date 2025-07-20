import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {state} = useLocation();
  const coupon = state?.coupon;
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const baseAmount = 5;
  const discount = coupon?.discountAmount || 0;
  const finalAmount = baseAmount - discount;
  const amountInCents = finalAmount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isProcessing) return;

    const confirm = await Swal.fire({
      title: 'Confirm Payment',
      text: `Do you want to pay $${finalAmount} for membership?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay Now',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return;

    setIsProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    console.log('Payment method:', paymentMethod);

    if (error) {
      setError(error.message);
      setIsProcessing(false);
      return;
    }

    setError('');

    try {
      const res = await axiosSecure.post('/create-payment-intent', { amountInCents });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        setError('');

        const paymentData = {
          email: user.email,
          finalAmount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        await axiosSecure.post('/payments', paymentData);

        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
          confirmButtonText: 'Go to My Profile',
        });

        navigate('/dashboard/myProfile');
      }
    } catch (err) {
      console.error(err);
      setError('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-lg bg-base-200 shadow-xl p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Subscribe Membership</h2>

        <div className="border border-gray-300 rounded p-4 mb-6 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#000',
                  '::placeholder': {
                    color: '#a0aec0',
                  },
                },
                invalid: {
                  color: '#dc2626',
                },
              },
            }}
          />
        </div>

        {error && <p className="text-error mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full text-white"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay $${finalAmount}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
