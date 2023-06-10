import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { userNotification } from "../../lib/requests";
import { IError } from "../../lib/interface";
import NotificationCard from "./NotificationCard";
import BackBtn from "../common/BackBtn";
import Loader from "../loaders/Loader";

const Notification = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: userNotification,
    onError: (error: IError) => {
      console.log(error);
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <section className="mb-16">
      <BackBtn>
        <div className="flex-1 font-semibold text-center text-base">
          Notification
        </div>
      </BackBtn>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div key={item._id}>
            {item.post?.userId !== item?.sender?._id && (
              <NotificationCard
                sender={item.sender}
                type={item.type}
                post={item.post}
                comment={item.comment}
                createdAt={item.createdAt}
                _id={item._id}
              />
            )}
          </div>
        ))
      ) : (
        <div className="h-[calc(100vh_-_4rem)] text-xl flex items-center justify-center">
          Nothing to see here!
        </div>
      )}
    </section>
  );
};

export default Notification;
