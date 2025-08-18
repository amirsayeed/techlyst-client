import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';
import CouponSlider from '../CouponSlider/CouponSlider';
import HowItWorks from '../HowItWorks/HowItWorks';
import UserReviews from '../UserReviews/UserReviews';
import AboutTechLyst from '../AboutTechlyst/AboutTechlyst';
import CallToAction from '../CallToAction/CallToAction';

const Home = () => {
    return (
        <div>
            <Banner/>
            <AboutTechLyst/>
            <FeaturedProducts/>
            <TrendingProducts/>
            <CouponSlider/>
            <HowItWorks/>
            <UserReviews/>
            <CallToAction/>
        </div>
    );
};

export default Home;