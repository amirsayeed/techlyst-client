import React from 'react';
import notFound from '../../../assets/404_error_page_not_found.gif'
import { Link } from 'react-router';
const Error = () => {
    return (
        <div className='max-w-md mx-auto px-1'>
            <div className='flex flex-col items-center justify-center gap-3 my-10 min-h-screen'>
            <img className='h-[350px] object-cover' src={notFound} alt="" />
            <Link to='/'>
                <button className='btn btn-primary'>Go Back Home</button>
            </Link>
            </div>
        </div>
    );
};

export default Error;