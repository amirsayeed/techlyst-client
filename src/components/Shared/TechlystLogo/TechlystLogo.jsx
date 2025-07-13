import React from 'react';
import { Link } from 'react-router';
import logo from '../../../assets/icons8-technology-100.png'
const TechlystLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center'>
                <img src={logo} alt="" className='w-12 h-12 object-cover' />
                <h3 className='font-bold text-2xl'>TechLyst</h3>
            </div>
        </Link>
    );
};

export default TechlystLogo;