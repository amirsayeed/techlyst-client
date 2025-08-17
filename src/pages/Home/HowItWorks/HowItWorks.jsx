import React from 'react';
import { FaSearch, FaThumbsUp, FaRocket, FaShieldAlt } from 'react-icons/fa';

const steps = [
    {
      title: 'Browse the Latest Products',
      description:
        'Explore a curated list of the latest tech gadgets submitted by users.',
      icon: <FaSearch className="text-3xl text-[#1a91c2]" />,
    },
    {
      title: 'Upvote Your Favorites',
      description:
        'Like a product? Upvote to support it and help it trend on Techlyst.',
      icon: <FaThumbsUp className="text-3xl text-[#1a91c2]" />,
    },
    {
      title: 'Submit Your Own Products',
      description:
        'Discovered a cool tech item? Share it with the community for review.',
      icon: <FaRocket className="text-3xl text-[#1a91c2]" />,
    },
    {
      title: 'Report & Review Products',
      description:
        'Help maintain quality by reporting inappropriate listings and leaving reviews.',
      icon: <FaShieldAlt className="text-3xl text-[#1a91c2]" />,
    },
  ];

const HowItWorks = () => {
    return (
    <div className="my-12 bg-base-100 px-2 md:px-4">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral">
          How Techlyst Works
        </h2>
        <p className="text-base font-medium max-w-2xl mx-auto mb-12">
          Join the platform, explore innovative tech, and become part of a growing community!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card p-3 bg-base-100 shadow-xl border border-gray-300 rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <span className="mb-4">{step.icon}</span>
                <h3 className="text-lg font-bold">
                  {step.title}
                </h3>
                <p className="text-sm font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default HowItWorks;