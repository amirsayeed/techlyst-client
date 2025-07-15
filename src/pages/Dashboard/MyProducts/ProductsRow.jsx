import { Link } from "react-router";

const ProductsRow = ({ product, handleDelete }) => {
  return (
    <tr className="hover">
      <td>{product.productName}</td>
      <td>{product.votes ?? 0}</td>
      <td>
        <span className={`badge 
          ${product.status === 'Accepted' ? 'badge-success' :
            product.status === 'Rejected' ? 'badge-error' :
            'badge-warning'}`}>
          {product.status || 'Pending'}
        </span>
      </td>
      <td className="flex gap-2 justify-center">
        <Link
          to={`/dashboard/updateProduct/${product._id}`}
          className="btn btn-sm btn-info text-white"
        >
          Update
        </Link>
        <button
          onClick={() => handleDelete(product._id)}
          className="btn btn-sm btn-error text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductsRow;
