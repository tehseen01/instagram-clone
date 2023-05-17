import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProfile } from "../../lib/utils/requests";

const MiniProfile = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return (
    <div className="flex items-center py-2 px-6">
      <img
        src={user?.profilePicture || "/blank-profile.jpg"}
        alt={user?.name}
        className="rounded-full h-14 w-14 mr-4"
      />
      <div className="flex-1">
        <h2 className="font-semibold">{user?.username}</h2>
        <h3 className="text-gray-500 text-sm">{user?.name}</h3>
      </div>
      <button className="text-blue-400 text-sm font-semibold">Switch</button>
    </div>
  );
};

export default MiniProfile;
