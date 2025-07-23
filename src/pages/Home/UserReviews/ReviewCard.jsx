import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';

const ReviewCard = ({ review }) => {
  const { productId,reviewerName,reviewerImage,createdAt,description,rating } = review;

  return (
    <Link to={`/products/${productId}`}>
        <div className="card bg-base-100 rounded-xl border border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300 p-3">
            <div className="card-body p-4">
                <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img
                    src={reviewerImage}
                    alt={reviewerName}
                    className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className='space-y-1'>
                    <h3 className="font-semibold text-base-content">{reviewerName}</h3>
                    <p className="text-xs text-base-content/60">
                        {new Date(createdAt).toLocaleDateString()}
                    </p>
                    </div>
                </div>
                <div className="flex gap-1 mt-1">
                    {[...Array(rating)].map((_, i) => (
                    <FaStar key={i} className="text-warning text-sm" />
                    ))}
                </div>
                </div>

                <div className="divider my-2"></div>

                <p className="text-base text-base-content line-clamp-1">
                {description}
                </p>
            </div>
        </div>
    </Link>
  );
};

export default ReviewCard;
