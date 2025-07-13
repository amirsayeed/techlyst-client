import React from 'react';
import { Link, NavLink } from 'react-router';
import TechlystLogo from '../TechlystLogo/TechlystLogo';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const {user,logOut} = useAuth();
    
    const handleLogOut = () =>{
        logOut().then(()=>{
            toast.success('Successfully logged out');
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    const links = <>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/products'>Products</NavLink></li>
                  </>

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm lg:px-3">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg font-medium">
                    {links}
                </ul>
                </div>
                <TechlystLogo/>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-base font-medium">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? 
                    (<div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName} />
                            ) : (
                                <FaUserCircle size={40} className="text-gray-400" />
                            )}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                        >
                            <li className="cursor-default select-none font-semibold px-4 py-2">
                            {user.displayName}
                            </li>
                            <li>
                            <NavLink to="/dashboard" className="justify-between" tabIndex={-1}>
                              Dashboard
                            </NavLink>
                            </li>
                            <li>
                            <button
                                onClick={handleLogOut}
                                className="w-full text-left"
                                tabIndex={-1}
                            >
                                Logout
                            </button>
                            </li>
                        </ul>
                        </div>
                    ) :
                    (<div>
                        <Link to='/login' className="btn btn-primary p-2 text-sm rounded-md">Login</Link>
                    </div>)}
            </div>
            </div>
        </div>
    );
};

export default Navbar;