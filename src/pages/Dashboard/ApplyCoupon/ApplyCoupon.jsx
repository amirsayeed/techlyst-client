import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApplyCoupon = () => {
  const [code, setCode] = useState('');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
        Swal.fire('Required', 'Please enter a coupon code.', 'warning');
        return;
    }

    try {
        const res = await axiosSecure.get(`/coupons/validate?code=${code}`);
        const { discountAmount } = res.data;

        Swal.fire({
        title: 'Coupon Applied!',
        text: `Your discount amount is $${discountAmount}. Redirecting to payment...`,
        icon: 'success',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        }).then(() => {
        navigate('/dashboard/payment', {
            state: {
            coupon: {
                code,
                discountAmount,
            },
            },
        });
        });
    } catch (err) {
        const message =
        err?.response?.data?.message || 'Failed to validate coupon. Please try again.';
        Swal.fire('Invalid Coupon', message, 'error');
    }
    };


  return (
    <div className='mt-20 max-w-sm mx-auto'>
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-base-200 rounded shadow">
      <label htmlFor="code" className="block font-semibold">
        Enter Coupon Code
      </label>
      <input
        id="code"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="e.g. SAVE5"
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Apply Coupon & Continue to Payment
      </button>
    </form>
    </div>
  );
};

export default ApplyCoupon;