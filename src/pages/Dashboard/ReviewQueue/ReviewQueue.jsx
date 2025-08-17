import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaEye, FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loading from '../../../components/Shared/Loading/Loading';

const ReviewQueue = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products');
      return res.data;
    },
  });

  const { mutateAsync: updateProductStatus, isLoading: isUpdatingStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/products/${id}/status`, { status });
      return res.data;
    },
    onSuccess: (data, variables) => {
      Swal.fire('Updated!', `Product status changed to ${variables.status}.`, 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update product status.', 'error');
    },
  });


   const { mutateAsync: markAsFeatured, isPending: isMarkingFeatured } = useMutation({
    mutationFn: async (id) => {
        const res = await axiosSecure.patch(`/products/${id}/featured`, {
        isFeatured: true,
        });
        return res.data;
    },
    onSuccess: () => {
        Swal.fire('Success', 'Product marked as featured.', 'success');
        refetch();
    },
    onError: () => {
        Swal.fire('Error', 'Failed to mark as featured.', 'error');
    }
    });


  const handleAccept = async (id) => {
    const confirm = await Swal.fire({
      title: 'Accept this product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it',
    });

    if (confirm.isConfirmed) {
      await updateProductStatus({ id, status: 'accepted' });
    }
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: 'Reject this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it',
    });

    if (confirm.isConfirmed) {
      await updateProductStatus({ id, status: 'rejected' });
    }
  };

  const handleFeature = async (id) => {
    const confirm = await Swal.fire({
      title: 'Mark this product as featured?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark as featured',
    });

    if (confirm.isConfirmed) {
      await markAsFeatured(id);
    }
  };

  if (isLoading){
    return <Loading/>;
  };

  return (
    <div>
      <title>TechLyst | Product Review Queue</title>
      <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Product Review Queue</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>View</th>
            <th>Make Featured</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={product._id}>
              <td>{idx + 1}</td>
              <td>{product.productName}</td>
              <td className="capitalize">{product.status}</td>
              <td>
                <Link to={`/products/${product._id}`} className="btn btn-sm text-white bg-[#4dbbe8]">
                  <FaEye className="mr-1" /> View
                </Link>
              </td>
              <td>
                <button
                    className="btn btn-sm text-white bg-[#4dbbe8]"
                    onClick={() => handleFeature(product._id)}
                    disabled={product.isFeatured || isMarkingFeatured}
                    >
                    <FaStar className="mr-1" /> {product?.isFeatured ? 'Featured' : 'Feature'}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-success text-white"
                  onClick={() => handleAccept(product._id)}
                  disabled={product.status === 'accepted' || isUpdatingStatus}
                >
                  <FaCheck className="mr-1" /> Accept
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() => handleReject(product._id)}
                  disabled={product.status === 'rejected' || isUpdatingStatus}
                >
                  <FaTimes className="mr-1" /> Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ReviewQueue;
