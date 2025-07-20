import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';
import CouponSlider from '../CouponSlider/CouponSlider';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedProducts/>
            <TrendingProducts/>
            <CouponSlider/>
        </div>
    );
};

export default Home;