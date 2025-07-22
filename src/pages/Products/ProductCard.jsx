import { FaArrowUp } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const ProductCard = ({ product, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const isOwner = user?.email === product.ownerEmail;
  const hasVoted = product.voters?.includes(user?.email);

  const handleUpvote = async () => {
    if (!user) {
      return navigate('/login');
    }

    try {
      const res = await axiosInstance.patch(`/products/upvote/${product._id}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        toast.success('Upvoted successfully!');
        refetch?.();
      } else {
        toast.error('You have already upvoted this product.');
      }
    } catch (err) {
      toast.error('Failed to upvote. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition p-5">
      <figure>
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="w-full h-[200px]"
        />
      </figure>

      <div className="mt-3 space-y-4">
        <h3
          className="text-center text-xl font-bold cursor-pointer hover:text-blue-600"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          {product.productName}
        </h3>

        <div className="flex flex-wrap justify-center gap-2 text-sm mb-4">
          {product.tags?.map(tag => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="card-actions mt-3">
          <button
            disabled={isOwner || hasVoted}
            onClick={handleUpvote}
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
};

export default ProductCard;
