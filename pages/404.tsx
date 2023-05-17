import Link from "next/link";
import React from "react";

function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 w-full text-center max-w-3xl">
        <h1 className="text-9xl md:text-[12rem] font-extralight mb-4 font-kanit">
          404
        </h1>
        <h2 className="text-xl md:text-3xl mb-8 font-kanit font-extralight uppercase">
          Oops! This page could not be found.
        </h2>
        <p className="font-kanit font-extralight text-base">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.{" "}
          <Link href="/" className="text-indigo-500 border-0 border-b">
            Return to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Error404;
