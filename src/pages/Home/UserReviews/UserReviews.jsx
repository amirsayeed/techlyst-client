import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Shared/Loading/Loading';
import useAxios from '../../../hooks/useAxios';
import ReviewCard from './ReviewCard';

const UserReviews = () => {
  const axiosInstance = useAxios();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['userReviews'],
    queryFn: async () => {
      const res = await axiosInstance.get('/reviews');
      return res.data;
    },
  });

  if (isLoading){
    return <Loading/>;
  };

  return (
    <div className="my-10">
      <div className="px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          What People Are Saying
        </h2>
        <p className="text-base font-medium text-center max-w-xl mx-auto mb-12">
          Here’s what our users think about the latest tech products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        {reviews.length === 0 && (
          <p className="text-center text-xl font-medium mt-8">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserReviews;
