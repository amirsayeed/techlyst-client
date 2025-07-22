import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import ProductCard from '../../Products/ProductCard';


const TrendingProducts = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['trending-products'],
    queryFn: async () => {
      const res = await axiosInstance.get('/trending-products');
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading trending products...</p>;
  }

  return (
    <div className="my-10 px-1">
      <h2 className="text-3xl font-bold mb-8 text-center">Trending Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} refetch={refetch} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Show All Products
        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;
