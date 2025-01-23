import React from 'react';
import Intro from './Intro/Intro';

const HeroTop = () => {
  return (
    <div className="flex flex-col justify-center items-center" style={{ minHeight: "90vh" }}>
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
          {/* Intro component on the left */}
          <div className="lg:w-1/2 w-full lg:pr-8">
            <Intro />
          </div>

          {/* Video Section on the right */}
          <div className="lg:w-1/2 w-full lg:pl-8 mt-8 lg:mt-0">
            <div className="relative pb-16/9 mt-12">
              <iframe
                className="w-full h-96 rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTop;