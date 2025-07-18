import { FaArrowUp } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ProductCard = ({ product, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const isOwner = user?.email === product.ownerEmail;
  const hasVoted = product.voters?.includes(user?.email);

  const handleUpvote = async () => {
    if (!user) {
      return navigate('/login');
    }

    try {
      const res = await axiosSecure.patch(`/products/upvote/${product._id}`, {
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
    <div className="card bg-base-100 shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition">
      <figure className="h-40 overflow-hidden">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="w-full h-full object-cover"
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
          {product.tags?.map(tag => (
            <span
              key={tag}
              className="bg-green-100 text-green-600 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="card-actions mt-auto">
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
