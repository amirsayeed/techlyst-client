import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import useAxios from '../../../hooks/useAxios';
import { FaCalendarAlt, FaMoneyBillWave, FaTags } from 'react-icons/fa';
import { format } from 'date-fns';
import Loading from '../../../components/Shared/Loading/Loading';

const CouponSlider = () => {
  const axiosInstance = useAxios();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons', 'active'],
    queryFn: async () => {
      const res = await axiosInstance.get('/coupons?active=true');
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;

  return (
    <div className="my-12 space-y-4 px-2 md:px-4">
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
            <div className="bg-base-100 border border-gray-400 rounded-xl shadow-xl hover:shadow-2xl transition text-center p-10 max-w-3xl mx-auto mt-4">
              <h3 className="text-xl font-bold mb-2 flex flex-col md:flex-row items-center justify-center gap-2">
                <FaTags />
                Coupon Code: <span className="text-[#1a91c2]">{coupon.code}</span>
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
