import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedProducts/>
            <TrendingProducts/>
        </div>
    );
};

export default Home;