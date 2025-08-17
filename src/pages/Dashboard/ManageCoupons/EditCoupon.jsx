import { useForm } from "react-hook-form";

const EditCoupon = ({ coupon, onClose, onUpdate }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      code: coupon.code,
      expiryDate: coupon.expiryDate.slice(0, 10),
      description: coupon.description,
      discountAmount: coupon.discountAmount,
      isActive: coupon.isActive,
    },
  });

  const onSubmit = (data) => {

    const discountAmountNum = parseFloat(data.discountAmount);
    const expiryDateISO = new Date(data.expiryDate).toISOString();
    const isActiveBool = data.isActive === "on" || data.isActive === true;

    const updatedData = {
      ...data, 
      discountAmount: discountAmountNum,
      expiryDate: expiryDateISO,
      isActive: isActiveBool,
    };

    onUpdate(updatedData);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 border-2 border-[#4dbbe8] p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Edit Coupon</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("code", { required: true })}
          />

          <input
            type="date"
            className="input input-bordered w-full"
            {...register("expiryDate", { required: true })}
          />

          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          />

          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            {...register("discountAmount", { required: true })}
          />

          <label className="label cursor-pointer flex items-center space-x-2">
            <span className="label-text">Active</span>
            <input
              type="checkbox"
              className="checkbox"
              {...register("isActive")}
            />
          </label>

          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn text-white bg-[#4dbbe8]">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoupon;
