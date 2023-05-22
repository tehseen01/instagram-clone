import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Loader from "../loaders/Loader";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { followOrUnFollowUser, suggestedUser } from "../../lib/utils/requests";

const Suggestions = () => {
  const [btnText, setBtnText] = useState<{ [key: string]: boolean }>({});

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: suggestedUser,
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: followOrUnFollowUser,
    onSuccess: (data) => toast.success(data.message),
  });

  const handleFollowBtn = (id: string) => {
    mutate(id);

    setBtnText({ ...btnText, [id]: !btnText[id] });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="py-2 pl-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-400 font-semibold text-sm">
          Suggestions for you
        </h2>
        <button className="text-sm hover:text-gray-400">See All</button>
      </div>

      <div className="mt-4">
        {user?.length > 0 &&
          user?.map((user) => (
            <div className="flex items-center mb-2 gap-4" key={user?._id}>
              <Link href="/[profile]" as={`/${user?.username}`}>
                <Image
                  src={user?.profilePicture || "/blank-profile.jpg"}
                  width={32}
                  height={32}
                  alt={user?.username}
                  className="rounded-full !h-8 w-8 object-cover"
                />
              </Link>
              <div className="flex-1">
                <Link
                  href="/[profile]"
                  as={`/${user?.username}`}
                  className="font-semibold"
                >
                  {user?.username}
                </Link>
                <h3 className="text-xs text-gray-500">{user?.name}</h3>
              </div>
              <button
                className="text-blue-400 hover:text-blue-500 font-semibold py-1 px-2 my-2"
                onClick={() => handleFollowBtn(user?._id)}
              >
                {btnText[user?._id] ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Suggestions;
