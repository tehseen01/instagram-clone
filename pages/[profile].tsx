import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import Loader from "../components/loaders/Loader";
import ProfileInfo from "../components/profilePage/ProfileInfo";
import EditProfile from "../components/profilePage/EditProfile";
import PostGallery from "../components/profilePage/PostGallery";
import ProfileSetting from "../components/profilePage/ProfileSetting";
import ChangePassword from "../components/profilePage/ChangePassword";

import {
  openEditProfile,
  setBio,
  setName,
  setProfilePicture,
  setUsername,
} from "../redux/slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

import { fetchUser, getProfile } from "../lib/requests";
import { IError } from "../lib/interface";
import { toast } from "react-toastify";
import FollowsModal from "../components/profilePage/FollowsModal";

const profile = () => {
  const router = useRouter();
  const { profile } = router.query;

  const dispatch = useAppDispatch();
  const { isEditProfile, isProfileSetting, isChangePassword } = useAppSelector(
    (state) => state.profile
  );

  const { isFollowModal } = useAppSelector((state) => state.follow);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["user", profile],
    queryFn: () => fetchUser(profile as string),
    // refetchOnWindowFocus: false,
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  const { data: owner } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
  });

  const editProfile = () => {
    dispatch(openEditProfile(true));
    dispatch(setName(data?.name));
    dispatch(setUsername(data?.username));
    dispatch(setProfilePicture(data?.profilePicture));
    dispatch(setBio(data?.bio));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data && Object.keys(data).length > 0 && (
        <main className="ml min-h-screen">
          <ProfileInfo editProfile={editProfile} owner={owner} data={data} />
          {/* PROFILE POSTS */}
          <PostGallery data={data} />
        </main>
      )}

      {isEditProfile && <EditProfile />}
      {isProfileSetting && <ProfileSetting />}
      {isChangePassword && <ChangePassword owner={owner} />}
      {isFollowModal && <FollowsModal data={data} owner={owner} />}
    </>
  );
};

export default profile;
