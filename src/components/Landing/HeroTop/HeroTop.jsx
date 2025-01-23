import React from 'react';
import Intro from './Intro/Intro';
import Splash from "../../../assets/landing/hero/splash/splash.svg";
import Counters from "./Counters/Counters";

const HeroTop = () => {
  return (
    <div className='flex flex-col justify-between' style={{ minHeight: "85vh", marginBottom: "100px" }}>
      <div className="flex flex-col justify-center items-center" style={{ gap: "90px" }}>
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
            {/* Intro component on the left */}
            <div className="lg:w-1/2 w-full lg:pr-8">
              <Intro />
            </div>

            {/* Video Section on the right */}
            <div className="lg:w-1/2 w-full lg:pl-8 mt-8 lg:mt-0">
              <img src={Splash} alt="Splash" className="w-full" />
            </div>
          </div>

        </div>

      </div>
      <Counters />
    </div>
  );
};

export default HeroTop;