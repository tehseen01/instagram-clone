import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineCheck } from "react-icons/md";
import { toast } from "react-toastify";
import Overlay from "../common/Overlay";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { handleImage } from "../../lib/utils/handleImage";
import {
  closeEditProfile,
  setBio,
  setName,
  setProfilePicture,
  setUsername,
} from "../../redux/slices/profileSlice";
import { DataMessage, IError, IUpdateProfile } from "../../lib/interface";
import Spinner from "../loaders/Spinner";
import { updateProfile } from "../../lib/requests";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { name, username, profilePicture, bio } = useAppSelector(
    (state: RootState) => state.profile
  );

  const [image, setImage] = useState(profilePicture);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImage(e, setImage);
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      dispatch(closeEditProfile(false));
      toast.success(data.message);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileData: IUpdateProfile = { name, username, profilePicture, bio };

    mutate(profileData);
  };

  useEffect(() => {
    dispatch(setProfilePicture(image));
  }, [image]);

  return (
    <Overlay className="max-sm:items-start max-sm:bg-white">
      <div className="bg-white w-full sm:w-1/2 sm:h-4/5 sm:rounded-md p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div
              onClick={() => dispatch(closeEditProfile(false))}
              className="cursor-pointer"
            >
              <MdClose className="w-6 h-6" />
            </div>
            <p className="font-medium">Edit Profile</p>
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner className="w-5 h-5" />
              ) : (
                <MdOutlineCheck className="text-blue-500 w-6 h-6" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center flex-col gap-3 mt-8">
            <label
              htmlFor="profilePicture"
              className="text-blue-500 font-medium cursor-pointer"
            >
              <Image
                src={profilePicture}
                width={180}
                height={180}
                alt={name}
                className="w-24 !h-24 rounded-full object-cover"
              />
              Edit picture
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                onChange={handleProfileImage}
                className="hidden"
              />
            </label>
            <label className="w-full relative pt-4" htmlFor="name">
              <span className="absolute top-0 left-0 text-slate-500">Name</span>
              <input
                className="w-full border-0 border-b border-gray-400 focus:ring-0 px-0"
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
            </label>
            <label className="w-full relative pt-4" htmlFor="username">
              <span className="absolute top-0 left-0 text-slate-500">
                Username
              </span>
              <input
                className="w-full border-0 border-b border-gray-400 focus:ring-0 px-0"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
              />
            </label>
            <label className="w-full relative pt-4" htmlFor="bio">
              <span className="absolute top-0 left-0 text-slate-500">Bio</span>
              <input
                className="w-full border-0 border-b border-gray-400 focus:ring-0 px-0"
                type="text"
                name="bio"
                id="bio"
                placeholder="bio"
                value={bio}
                onChange={(e) => dispatch(setBio(e.target.value))}
              />
            </label>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default EditProfile;
