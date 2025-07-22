import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";
import Loading from "../../components/Shared/Loading/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: product, isLoading: isProductLoading, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const {
    data: reviews = [],
    refetch: refetchReviews,
    isLoading: isReviewsLoading,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const handleUpvote = async () => {
    try {
      const res = await axiosSecure.patch(`/products/upvote/${id}`, {
        voterEmail: user.email,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Upvoted!");
        refetch();
      } else {
        toast.error(res.data.error || "You already voted!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to upvote.");
    }
  };

  const handleReport = async () => {
    try {
      const res = await axiosSecure.patch(`/products/report/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Product reported.");
      } else {
        toast.error("Already reported.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to report.");
    }
  };

  if (isProductLoading || !product){
    return <Loading/>;
  }

  const {
    productName,
    productImageUrl,
    description,
    tags,
    externalLink,
    votes,
  } = product || {};

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-5">
      <img src={productImageUrl} alt={productName} className="w-full h-[75vh] rounded-2xl shadow" />
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-3xl font-bold">{productName}</h1>
        {externalLink && (
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary p-3"
        >
          Visit Website
        </a>
      )}
      </div>
      <p className="text-lg">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, i) => (
          <span key={i} className="badge p-3 text-blue-500 bg-blue-100">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button onClick={handleUpvote} className="btn btn-success btn-sm">
          Upvote ({votes || 0})
        </button>
        <button onClick={handleReport} className="btn btn-error btn-sm">
          Report
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between">
        <Reviews 
        reviews={reviews} 
        isLoading={isReviewsLoading} 
        />
        
        <ReviewForm 
        productId={id} 
        refetchReviews={refetchReviews} 
        />
      </div>
    </div>
  );
};

export default ProductDetails;
