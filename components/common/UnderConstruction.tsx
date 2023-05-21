import Image from "next/image";
import React from "react";

const UnderConstruction = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div>
        <div className="flex items-center justify-center">
          <Image
            src={"/construction.png"}
            alt="coming soon"
            width={200}
            height={200}
            className="sm:w-[300px]"
          />
        </div>
        <h1 className="text-4xl text-center sm:text-5xl sm:font-semibold text-slate-800">
          This page is under construction
        </h1>
        <p className="text-slate-600 text-xl text-center my-4">
          We're working on it
        </p>
      </div>
    </section>
  );
};

export default UnderConstruction;
