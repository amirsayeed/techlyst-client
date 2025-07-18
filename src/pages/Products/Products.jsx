import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Shared/Loading/Loading';
import ProductCard from './ProductCard';


const Products = () => {
  const [search, setSearch] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['accepted-products', search],
    queryFn: async () => {
      const res = await axiosSecure.get('/accepted-products', {
        params: { search },
      });
      return res.data;
    },
  });

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {isLoading ? (
        <Loading/>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
