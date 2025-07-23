import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Shared/Loading/Loading';
import ProductsRow from './ProductsRow'; 

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['myProducts', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myproducts?email=${user.email}`);
      return res.data;
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/products/${id}`);
          if (res.data?.deletedCount) {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'Failed to delete the product.', 'error');
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Products</h2>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="text-center text-red-500">Failed to load products.</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">You haven’t added any products yet.</div>
      ) : (
        <div className="overflow-x-auto bg-base-200">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Votes</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <ProductsRow
                  key={product._id}
                  product={product}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
