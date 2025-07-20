import AddCouponForm from "./AddCouponForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from '../../../components/Shared/Loading/Loading'

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();

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
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Manage Coupons</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* coupon card */}
      </div>

      <div className="mt-10">
        <AddCouponForm refetch={refetch} />
      </div>

      
    </div>
  );
};

export default ManageCoupons;
