import { useRef, useEffect } from "react";

export const ScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() =>
    elementRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    })
  );
  return <div ref={elementRef} className="mt-2" />;
};
