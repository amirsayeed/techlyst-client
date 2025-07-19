import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Reviews = ({ productId }) => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${productId}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="flex-1 space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((review, i) => (
        <div key={i} className="p-4 bg-base-200 rounded-xl shadow">
          <div className="flex flex-col gap-3 mb-2">
            <div className="flex items-center gap-2">
                <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-10 h-10 rounded-full"
                />
                <h3 className="font-bold">{review.reviewerName}</h3>
            </div>
            <div>
              <p className="text-sm">{review.description}</p>
              <p className="text-sm">Rating: {review.rating}★</p>
            </div>
          </div>
          <p>{review.reviewDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
