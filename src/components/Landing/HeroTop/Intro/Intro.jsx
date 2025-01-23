import React from 'react';
import StartStudying from "./StartStudying/StartStudying";

const Intro = () => {
  return (
    <div className="flex flex-col justify-center lg:justify-start lg:text-left lg:w-full mt-12" style={{ gap: "20px" }}>
      <h1 className="text-3xl lg:text-5xl font-bold text-orange-500">
        Stuck on a PYQ?
      </h1>
      <h2 className="text-3xl lg:text-5xl font-bold text-orange-500">
        Our Video Solutions
      </h2>
      <h3 className="text-3xl lg:text-5xl font-bold text-orange-500">
        Have Got You Covered!
      </h3>
      <p className="text-gray-700 mt-4">
        Get expert video solutions for every Class 10 & 12 PYQ, making exam
        preparation clear and stress-free!
      </p>
      <div className="mt-6 space-x-4">
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-md shadow-lg transform transition-transform hover:scale-105"
          style={{ boxShadow: "0 0 10px 2.5px rgba(255, 115, 0, .5)" }}
          onClick={() => window.location.href = '/demo/10/2024/pyq'}>
          CLASS 10
        </button>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-md shadow-lg transform transition-transform hover:scale-105" onClick={() => window.location.href = '/demo/12/2024/pyq'}
          style={{ boxShadow: "0 0 10px 2.5px rgba(255, 115, 0, .5)" }}>
          CLASS 12
        </button>
      </div>
      <br />
      {/* <StartStudying /> */}
    </div>
  );
};

export default Intro;