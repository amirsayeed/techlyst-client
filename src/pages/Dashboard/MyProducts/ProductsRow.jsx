import { FaRegEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";

const ProductsRow = ({ product, handleDelete }) => {
  return (
    <tr>
      <td>{product.productName}</td>
      <td>{product.votes}</td>
      <td>
        <span className={`badge 
          ${product.status === 'accepted' ? 'badge-success' :
            product.status === 'rejected' ? 'badge-error' :
            'badge-warning'}`}>
          {product.status || 'Pending'}
        </span>
      </td>
      <td className="flex gap-2 justify-center">
        <Link
          to={`/dashboard/updateProduct/${product._id}`}
          className="btn flex btn-sm rounded-xl text-white bg-[#4dbbe8]"
        >
          <span>Update</span>
          <span><FaRegEdit /></span>
        </Link>
        <button
          onClick={() => handleDelete(product._id)}
          className="btn flex btn-sm rounded-xl text-white bg-[#4dbbe8]"
        >
          <span>Delete</span>
          <span><IoTrashBin /></span>
        </button>
      </td>
    </tr>
  );
};

export default ProductsRow;
