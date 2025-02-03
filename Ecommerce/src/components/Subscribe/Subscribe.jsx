import React from "react";

const Subscribe = () => {
  return (
    <div
      data-aos="zoom-in"
      className="m-20 bg-slate-700 dark:bg-gray-800 text-white"
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto ">
          <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">
            Get Notified About New Products
          </h1>
          <input
            data-aos="fade-up"
            type="text"
            placeholder="Enter your email"
            className="w-full p-3 bg-slate-50 text-black rounded-md"
          />
          <div className="flex justify-center">
            <button className="text-center mt-2 cursor-pointer bg-slate-950 text-white py-2 px-5 rounded-3xl">
              Submit
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
