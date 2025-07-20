import React from 'react';
import TechlystLogo from '../components/Shared/TechlystLogo/TechlystLogo';
import { NavLink, Outlet } from 'react-router';
import { FaChartBar, FaClipboardCheck, FaExclamationTriangle, FaPlusCircle, FaTags, FaThList, FaUser, FaUsersCog } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();

    return (
         <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                
                <Outlet/>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full gap-2 w-80 p-4">
                    {/* Sidebar content here */}
                    <TechlystLogo/>
                    
                    {/* user links */}
                    {!roleLoading && role === 'user' && (
                    <>
                        <li>
                            <NavLink to="/dashboard/myProfile">
                                <FaUser className="inline mr-2" /> My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/addProduct">
                                <FaPlusCircle className="inline mr-2" /> Add Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/myProducts">
                                <FaThList className="inline mr-2" /> My Products
                            </NavLink>
                        </li>
                    </>)
                    }
                    
                    
                    {/* moderator links */}
                    {!roleLoading && role === 'moderator' && (
                    <>
                        <li>
                            <NavLink to="/dashboard/review-queue">
                                <FaClipboardCheck className="inline-block mr-2" />
                                Product Review Queue
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/reported-contents">
                                <FaExclamationTriangle className="inline-block mr-2" />
                                Reported Contents
                            </NavLink>
                        </li>
                    </>
                    )}

                    {/* admin links */}
                    {!roleLoading && role === 'admin' && (
                    <>
                        <li>
                            <NavLink to="/dashboard/adminStatistics">
                                <FaChartBar className="inline-block mr-2" />
                                Statistics
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manageUsers">
                                <FaUsersCog className="inline-block mr-2" />
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manageCoupons">
                                <FaTags className="inline-block mr-2" />
                                Manage Coupons
                            </NavLink>
                        </li>
                    </>
                    )}

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;