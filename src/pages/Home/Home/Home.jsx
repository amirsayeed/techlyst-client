import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';
import CouponSlider from '../CouponSlider/CouponSlider';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedProducts/>
            <TrendingProducts/>
            <CouponSlider/>
            <HowItWorks/>
        </div>
    );
};

export default Home;