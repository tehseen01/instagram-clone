import React, { ReactNode } from "react";

interface IOverlayProp {
  children: ReactNode
  className: string
}

const Overlay = ({ children, className }: IOverlayProp) => {
  return (
    <section
      className={`flex items-center justify-center overlay max-h-screen md:py-6 ${className}`}
    >
      {children}
    </section>
  );
};

export default Overlay;
