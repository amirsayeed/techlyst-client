import { FaChartBar, FaUsersCog, FaTags } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div>
      <title>TechLyst | Dashboard</title>
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
      <p className="text-base mb-6">
        Oversee platform statistics, user roles, and coupon management from here.
      </p>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="bg-base-200 rounded-xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3">
            <FaChartBar className="text-2xl" />
            <h3 className="text-lg font-bold">Statistics</h3>
          </div>
          <p className="text-sm font-normal text-justify">
            View total products (accepted, pending, rejected), reviews, and user counts with pie chart visualization.
          </p>
        </div>

        <div className="bg-base-200 rounded-xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3">
            <FaUsersCog className="text-2xl" />
            <h3 className="text-lg font-bold">Manage Users</h3>
          </div>
          <p className="text-sm font-normal text-justify">
            Assign user roles — promote users to Moderator or Admin as needed.
          </p>
        </div>

        <div className="bg-base-200 rounded-xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3">
            <FaTags className="text-2xl" />
            <h3 className="text-lg font-bold">Manage Coupons</h3>
          </div>
          <p className="text-sm font-normal text-justify">
            Add new coupons and update or remove existing ones.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
