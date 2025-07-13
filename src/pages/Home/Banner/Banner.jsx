import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
  {
    id: 1,
    image: 'https://i.ibb.co/DDQ1Nmyd/img1.jpg',
    title: 'Discover the Future of Tech',
    description: 'Explore cutting-edge tools and apps\ncrafted by innovators around the world.',
  },
  {
    id: 2,
    image: 'https://i.ibb.co/G3xHxMzf/img2.jpg',
    title: 'Launch Your Product Today',
    description: 'Share your creations and get instant feedback\nfrom a vibrant tech community.',
  },
  {
    id: 3,
    image: 'https://i.ibb.co/zhCkyns2/img3.jpg',
    title: 'Connect. Build. Grow.',
    description: 'Join makers, developers, and dreamers\nwho are shaping the digital future.',
  },
];

const Banner = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      {slides.map((slide) => (
        <div key={slide.id} className="relative">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-[75vh] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center text-left px-8 lg:px-16 text-white">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg whitespace-pre-line">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
