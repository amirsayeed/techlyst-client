import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../components/Shared/Loading/Loading';
import { IoTrashBin } from "react-icons/io5";
import { FcViewDetails } from 'react-icons/fc';

const ReportedContents = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: reportedProducts = [], refetch, isLoading } = useQuery({
    queryKey: ['reported-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reported-products');
      return res.data.products;
    },
  });

  if (isLoading){
    return <Loading/>;
  };

  const handleDelete = async (id) => {
     const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          await Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          refetch();
        } else {
          await Swal.fire('Error', 'Failed to delete the product.', 'error');
        }
      } catch (err) {
        console.error('Delete Error:', err);
        await Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
      }
    }
  };

  return (
    <div>
      <title>TechLyst | Reported Products</title>
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reported Products</h2>

      {reportedProducts.length === 0 ? (
        <p className="text-center">No reported products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>View Product</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="btn btn-sm flex rounded-xl text-white bg-[#4dbbe8]"
                    >
                      <span>View Details</span>
                      <span><FcViewDetails /></span>
                    </button></td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn flex btn-sm rounded-xl text-white bg-[#4dbbe8]"
                    >
                      <span>Delete</span>
                      <span><IoTrashBin /></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default ReportedContents;
