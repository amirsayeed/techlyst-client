import React from 'react';
import { FaSearch, FaThumbsUp, FaRocket, FaShieldAlt } from 'react-icons/fa';

const steps = [
    {
      title: 'Browse the Latest Products',
      description:
        'Explore a curated list of the latest tech gadgets submitted by users.',
      icon: <FaSearch className="text-3xl text-primary" />,
    },
    {
      title: 'Upvote Your Favorites',
      description:
        'Like a product? Upvote to support it and help it trend on Techlyst.',
      icon: <FaThumbsUp className="text-3xl text-primary" />,
    },
    {
      title: 'Submit Your Own Products',
      description:
        'Discovered a cool tech item? Share it with the community for review.',
      icon: <FaRocket className="text-3xl text-primary" />,
    },
    {
      title: 'Report & Review Products',
      description:
        'Help maintain quality by reporting inappropriate listings and leaving reviews.',
      icon: <FaShieldAlt className="text-3xl text-primary" />,
    },
  ];

const HowItWorks = () => {
    return (
    <div className="my-10 bg-base-100">
      <div className="px-4 text-center">
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
              className="card bg-base-200 p-3 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <h3 className="card-title text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default HowItWorks;