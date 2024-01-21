import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col gap-12 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
      <div className="flex flex-col gap-4">
        <p className="text-md">YOU HAVE TO GET</p>
        <h1 className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-purple-600">
          Jacked
        </h1>
      </div>
      <p className="text-sm md:text-base font-light">
        I myself have become unbelievably{" "}
        <span className="text-purple-600">jacked up</span> and may have accepted
        all risks that comes with it,{" "}
        <span className="text-purple-600">unable to fit through doors.</span>{" "}
      </p>
      <button className="px-8 py-4 rounded-md border border-purple-600 border-solid bg-slate-950 purpleShadow duration-150">
        <p>Start now!</p>
      </button>
    </div>
  );
};

export default Hero;
