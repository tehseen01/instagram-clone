import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IError, IUser } from "../../lib/interface";
import { followOrUnFollowUser } from "../../lib/requests";
import { toast } from "react-toastify";

interface IProfileBtnProps {
  owner: IUser;
  profileData: IUser;
  editProfile: () => void;
}

const ProfileButtons = ({
  profileData,
  owner,
  editProfile,
}: IProfileBtnProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: followOrUnFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return (
    <div>
      {profileData?._id === owner._id ? (
        <div className="flex items-center max-sm:justify-center gap-4">
          <button
            className="py-1 px-3 bg-gray-200 rounded-md max-sm:w-full text-center hover:bg-gray-300"
            onClick={editProfile}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div>
          {owner?.followings?.some((user) => user._id === profileData?._id) ? (
            <div className="flex items-center max-sm:justify-center gap-10">
              <button
                className="py-1 px-3 bg-blue-400 rounded-md max-sm:w-full text-center hover:bg-blue-500 text-white"
                onClick={() => mutate(profileData?._id)}
              >
                Following
              </button>
              <div className="py-1 px-3 bg-gray-200 rounded-md max-sm:w-full text-center">
                Message
              </div>
            </div>
          ) : (
            <button
              className="py-1 px-3 bg-blue-400 rounded-md max-sm:w-full text-center hover:bg-blue-500 text-white"
              onClick={() => mutate(profileData?._id)}
            >
              follow
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileButtons;
