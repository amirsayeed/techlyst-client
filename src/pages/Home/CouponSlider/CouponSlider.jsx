import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCalendarAlt, FaMoneyBillWave, FaTags } from 'react-icons/fa';
import { format } from 'date-fns';
import Loading from '../../../components/Shared/Loading/Loading';

const CouponSlider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons', 'active'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons?active=true');
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;

  return (
    <div className="my-10 space-y-4">
      <h2 className="text-3xl font-bold text-center">Grab Our Latest Coupons!</h2>
      <p className="text-base font-medium text-center">
          Unlock premium perks for less — use a coupon at checkout.
      </p>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon._id}>
            <div className="bg-base-200 text-center rounded-2xl p-8 shadow-md max-w-xl mx-auto mt-4">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                <FaTags />
                Coupon Code: <span className="text-blue-500">{coupon.code}</span>
              </h3>
              <p className="mb-1 flex font-medium items-center justify-center gap-2">
                <FaMoneyBillWave />
                Discount: ${coupon.discountAmount}
              </p>
              <p className="mb-1 flex font-medium items-center justify-center gap-2">
                <FaCalendarAlt />
                Expires on: {format(new Date(coupon.expiryDate), 'dd MMM, yyyy')}
              </p>
              <p className="mt-2 italic font-medium">{coupon.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CouponSlider;
