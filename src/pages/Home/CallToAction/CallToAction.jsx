import React from 'react';
import { Link } from 'react-router';

const CallToAction = () => {
  return (
    <div className='my-12 px-2 md:px-4'>
    <div className="bg-gradient-to-r from-[#a3c8d6] to-[#20a9e4] text-white text-center rounded-xl">
      <div className="max-w-3xl mx-auto p-10">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Share Your Innovation?
        </h2>
        <p className="text-lg mb-8 leading-relaxed">
          Join the TechLyst community today and let your product shine. 
          Get discovered, earn upvotes, and connect with tech enthusiasts 
          who value innovation.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard/addProduct"
            className="btn font-semibold rounded-2xl shadow-lg transition"
          >
            Submit a Product
          </Link>
          <Link
            to="/products"
            className="btn btn-outline border border-white font-semibold rounded-2xl shadow-lg transition"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CallToAction;
