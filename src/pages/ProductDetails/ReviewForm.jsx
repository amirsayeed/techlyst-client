import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ReviewForm = ({ productId, refetchReviews }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      productId,
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      description,
      rating: parseFloat(rating),
    };

    try {
      const res = await axiosSecure.post("/reviews", review);
      if (res.data.insertedId) {
        toast.success("Review submitted!");
        setDescription("");
        setRating(5);
        refetchReviews && refetchReviews();
      }
    } catch (err) {
      console.error("Review submission failed", err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
    <form
      onSubmit={handleSubmit}
      className="mt-10 p-6 rounded-xl shadow-xl bg-white space-y-4"
    >
      <h2 className="text-2xl text-center font-semibold text-gray-800">Send Your Review</h2>

      <div className="grid gap-4">
        <div className="space-y-1">
          <label className="label">
            <span className="label-text font-medium">Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div className="space-y-1">
          <label className="label">
            <span className="label-text font-medium">Profile Image URL</span>
          </label>
          <input
            type="text"
            value={user?.photoURL}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div className="space-y-1">
          <label className="label">
            <span className="label-text font-medium">Review</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your review..."
            required
            className="textarea textarea-bordered w-full min-h-[100px]"
          ></textarea>
        </div>

        <div className="space-y-1">
          <label className="label">
            <span className="label-text font-medium">Rating (1 to 5)</span>
          </label>
          <input
            type="number"
            value={rating}
            min={1}
            max={5}
            onChange={(e) => setRating(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Review
        </button>
      </div>
    </form>
    </div>
  );
};

export default ReviewForm;
