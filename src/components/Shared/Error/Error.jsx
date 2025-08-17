import React from 'react';
import notFound from '../../../assets/404_error_page_not_found.gif'
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
const Error = () => {
    return (
        <div className='max-w-md mx-auto px-1'>
            <div className='flex flex-col items-center justify-center gap-3 my-10 min-h-screen'>
            <img className='h-[350px] object-cover' src={notFound} alt="" />
            <Link to='/'>
                <button className='btn flex text-white bg-[#4dbbe8]'>
                    <span><FaArrowLeft/></span> 
                    <span>Go Back Home</span>
                </button>
            </Link>
            </div>
        </div>
    );
};

export default Error;