import React from "react";
import { ExploreGallery, Searchbar } from "../components/explore";

const explore = () => {
  return (
    <main className="ml">
      <Searchbar />
      <ExploreGallery />
    </main>
  );
};

export default explore;
