import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Shared/Loading/Loading';
import ProductCard from '../Home/TrendingProducts/ProductCard';


const Products = () => {
  const axiosSecure = useAxiosSecure();
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['accepted-products'],
    queryFn: async () => {
            const res = await axiosSecure.get('/accepted-products');
            return res.data;
        }
  });

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load products.</div>;
  }

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
