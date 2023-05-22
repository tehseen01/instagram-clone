import React from "react";
import { useProfileData } from "../../hooks";

const MiniProfile = () => {
  const { userData } = useProfileData();

  return (
    <div className="flex items-center py-2 px-6">
      <img
        src={userData?.profilePicture || "/blank-profile.jpg"}
        alt={userData?.name}
        className="rounded-full h-14 w-14 mr-4"
      />
      <div className="flex-1">
        <h2 className="font-semibold">{userData?.username}</h2>
        <h3 className="text-gray-500 text-sm">{userData?.name}</h3>
      </div>
      <button className="text-blue-400 text-sm font-semibold">Switch</button>
    </div>
  );
};

export default MiniProfile;
