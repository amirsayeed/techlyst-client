import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddCouponForm = ({ refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const newCoupon = {
      code: data.code,
      expiryDate: new Date(data.expiryDate).toISOString(),
      description: data.description,
      discountAmount: parseFloat(data.discountAmount),
      isActive: true,
    };

    try {
      const res = await axiosSecure.post("/coupons", newCoupon);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Coupon Added",
          text: "The coupon was added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        refetch && refetch();
      }
    } catch (err) {
      console.error("Add coupon failed", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Coupon",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="label">Coupon Code</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("code", { required: true })}
          />
        </div>

        <div>
          <label className="label">Expiry Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("expiryDate", { required: true })}
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div>
          <label className="label">Discount Amount</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            {...register("discountAmount", { required: true, min: 0 })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCouponForm;
