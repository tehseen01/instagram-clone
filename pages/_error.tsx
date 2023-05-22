import { NextPageContext } from "next";
import Link from "next/link";
import React from "react";

interface ErrorProps {
  statusCode: number;
  message?: string;
}

function Error({ statusCode, message }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 w-full text-center max-w-3xl">
        <h1 className="text-9xl md:text-[12rem] font-extralight mb-4 font-kanit">
          {statusCode || 404}
        </h1>
        <h2 className="text-xl md:text-3xl mb-8 font-kanit font-extralight uppercase">
          {statusCode === 404
            ? "Oops! This page could not be found."
            : "Oops! Something went wrong please reload the page or try again later"}
        </h2>
        <p className="font-kanit font-extralight text-base">
          {message}.{" "}
          {statusCode === 404 && (
            <Link href="/" className="text-indigo-500 border-0 border-b">
              Return to homepage
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
