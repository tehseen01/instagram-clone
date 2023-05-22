import React from "react";
import { useQuery } from "@tanstack/react-query";
import GalleryImg from "../common/GalleryImg";
import { fetchPosts } from "../../lib/requests";
import Loader from "../loaders/Loader";
import { IError } from "../../lib/interface";
import { toast } from "react-toastify";

export const ExploreGallery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["explore"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
    retry: 2,
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    <Loader />;
  }

  return (
    <section className="grid grid-cols-3 md:grid-cols-4 gap-1 mx-2">
      {data &&
        Object.entries(data).length > 0 &&
        data?.posts?.map((post) => <GalleryImg post={post} key={post?._id} />)}
    </section>
  );
};
