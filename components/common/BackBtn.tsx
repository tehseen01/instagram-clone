import { useRouter } from "next/router";
import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { ReactNode } from "react";

interface IBackBtnProp {
  children: ReactNode;
}

const BackBtn = ({ children }: IBackBtnProp) => {
  const router = useRouter();

  return (
    <div className="md:hidden flex items-center justify-between mb-2 px-4  py-3 max-md:border-b">
      <div onClick={() => router.back()} className="cursor-pointer">
        <BsChevronLeft className="w-5 h-5" />
      </div>
      {children}
    </div>
  );
};

export default BackBtn;
