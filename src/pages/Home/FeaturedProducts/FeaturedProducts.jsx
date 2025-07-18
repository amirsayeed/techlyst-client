import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaArrowUp } from 'react-icons/fa';
import Loading from '../../../components/Shared/Loading/Loading';

const FeaturedProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: products = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/featured-products');
      return res.data;
    }
  });

  const handleUpvote = async (productId) => {
    if (!user) return navigate('/login');

    try {
      const res = await axiosSecure.patch(`/products/upvote/${productId}`, {
        voterEmail: user.email
      });

      if (res.data?.modifiedCount > 0) {
        refetch();
      }
    } catch (err) {
      console.error('Upvote failed:', err);
    }
  };

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <p className="text-center text-red-500 py-10">Failed to load featured products.</p>;
  }

  return (
    <div className="my-10 px-1">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const isOwner = user?.email === product.ownerEmail;
          const hasVoted = product.voters?.includes(user?.email);

          return (
            <div
              key={product._id}
              className="card bg-base-100 shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition"
            >
              <figure>
                <img
                  src={product.productImageUrl}
                  alt={product.productName}
                  className="h-[200px]"
                />
              </figure>
              <div className="card-body space-y-1">
                <h3
                  className="text-center text-xl font-bold cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {product.productName}
                </h3>

                <div className="flex flex-wrap gap-2 text-sm mb-4">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="card-actions mt-auto">
                  <button
                    disabled={isOwner || hasVoted}
                    onClick={() => handleUpvote(product._id)}
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white font-medium transition ${
                      isOwner || hasVoted
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <FaArrowUp /> {product.votes || 0} Upvotes
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
