import { FaUserCircle, FaPlusCircle, FaThList } from 'react-icons/fa';

const UserDashboard = () => {
    return (
        <div>
            <title>TechLyst | Dashboard</title>
            <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
            <p className="text-base mb-6">
                From here, you can manage your membership, add new tech products, and view your submissions.
            </p>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-base-100 rounded-xl shadow-xl border border-gray-300 p-5 hover:shadow-2xl transition">
                    <div className="flex items-center gap-3 mb-3">
                        <FaUserCircle className="text-2xl" />
                        <h3 className="text-lg font-semibold">My Profile</h3>
                    </div>
                    <p className="text-sm font-normal text-justify">
                        View and update your personal info, apply a coupon, and subscribe to unlock premium features.
                    </p>
                </div>

                <div className="bg-base-100 rounded-xl shadow-xl border border-gray-300 p-5 hover:shadow-2xl transition">
                    <div className="flex items-center gap-3 mb-3">
                        <FaPlusCircle className="text-2xl" />
                        <h3 className="text-lg font-semibold">Add Product</h3>
                    </div>
                    <p className="text-sm font-normal text-justify">
                        Share your latest tech products with the community by submitting them through a simple form.
                    </p>
                </div>

                <div className="bg-base-100 rounded-xl shadow-xl border border-gray-300 p-5 hover:shadow-2xl transition">
                    <div className="flex items-center gap-3 mb-3">
                        <FaThList className="text-2xl" />
                        <h3 className="text-lg font-semibold">My Products</h3>
                    </div>
                    <p className="text-sm font-normal text-justify">
                        Manage all the products you’ve added, including their approval status.
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default UserDashboard;
