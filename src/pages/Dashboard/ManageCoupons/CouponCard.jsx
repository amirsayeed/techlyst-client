import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CouponCard = ({ coupon, onDelete, onUpdate }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    _id,
    code,
    expiryDate,
    description,
    discountAmount,
    isActive,
  } = coupon;

  return (
    <div className="card w-full bg-base-100 shadow-2xl rounded-xl">
      <div className="card-body space-y-2">
        <h2 className="card-title text-xl font-bold text-primary">{code}</h2>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Expires on:</span>{" "}
          {new Date(expiryDate).toLocaleDateString()}
        </p>
        <p className="text-sm">{description}</p>
        <p className="text-lg font-semibold text-green-600">
          Discount: ${discountAmount}
        </p>
        <p className="text-sm">
          <span className="font-medium">Status:</span>{" "}
          <span className={isActive ? "text-green-500" : "text-red-500"}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </p>

        <div className="card-actions mt-4 justify-end">
          <button onClick={() => setIsEditOpen(true)}
            className="btn btn-sm btn-outline btn-info"
          >
            <FaEdit className="mr-1" /> Edit
          </button>
          <button onClick={() => onDelete(_id)}
            className="btn btn-sm btn-outline btn-error"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
