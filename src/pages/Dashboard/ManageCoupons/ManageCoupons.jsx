import AddCouponForm from "./AddCouponForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from '../../../components/Shared/Loading/Loading'
import { useState } from "react";
import CouponCard from "./CouponCard";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectCoupon, setSelectedCoupon] = useState(null);

  const { data: coupons = [], refetch, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  if(isLoading){
    return <Loading/>;
  }

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Manage Coupons</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {coupons.map((coupon) => (
          <CouponCard
            key={coupon._id}
            coupon={coupon}
            setSelectedCoupon={setSelectedCoupon}
            refetch={refetch}
          />
        ))}
      </div>

      <div className="mt-10">
        <AddCouponForm refetch={refetch} />
      </div>

      
    </div>
  );
};

export default ManageCoupons;
