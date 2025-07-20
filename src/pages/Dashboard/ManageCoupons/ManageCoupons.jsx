import AddCouponForm from "./AddCouponForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from '../../../components/Shared/Loading/Loading'
import CouponCard from "./CouponCard";
import Swal from "sweetalert2";

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

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the coupon.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/coupons/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The coupon has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.error("Coupon delete failed", error);
        Swal.fire("Error", "Failed to delete the coupon.", "error");
      }
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axiosSecure.patch(`/coupons/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Coupon updated successfully.", "success");
        refetch();
      }
    } catch (error) {
      console.error("Coupon update failed", error);
      Swal.fire("Error", "Failed to update the coupon.", "error");
    }
  };

  return (
    <div className="my-10 px-10 space-y-8">
      <h2 className="text-2xl font-bold">Manage Coupons</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {coupons.map((coupon) => (
          <CouponCard
            key={coupon._id}
            coupon={coupon}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
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
