import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Shared/Loading/Loading';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';


const Products = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;

  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['accepted-products', search, page],
    queryFn: async () => {
      const res = await axiosSecure.get('/accepted-products', {
        params: { search, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className="my-10 px-1">
      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

      <SearchBar search={search} setSearch={setSearch} setPage={setPage}/>

      {isLoading ? (
        <Loading/>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            products.map((product) => (
              <ProductCard key={product._id} product={product} refetch={refetch} />
          ))}
        </div>

        <Pagination 
          page={page} 
          setPage={setPage} 
          totalPages={totalPages}/>
      </>
      )}
    </div>
  );
};

export default Products;
