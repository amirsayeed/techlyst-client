import Loading from "../../components/Shared/Loading/Loading";

const Reviews = ({ reviews, isLoading }) => {
  if(isLoading) return <Loading/>

  return (
    <div className="flex-1 space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((review, idx) => (
        <div key={idx} className="p-5 bg-base-100 rounded-xl shadow-xl border border-gray-200">
            <div className="flex items-start gap-2">
                <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-10 h-10 rounded-full"
                />
                
                <div className="flex flex-col">
                    <h3 className="font-bold mb-3">{review.reviewerName}</h3>
                    <p className="text-sm">{review.description}</p>
                    <p className="text-sm flex items-center gap-1">
                        Rating:
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? "text-base text-yellow-400" : "text-gray-300"}>
                            ★
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
