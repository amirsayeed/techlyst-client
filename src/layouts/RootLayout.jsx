import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className='max-w-[1500px] mx-auto bg-base-100'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default RootLayout;