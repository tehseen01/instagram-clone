import React, { ReactPropTypes } from "react";
import Overlay from "../common/Overlay";
import { BsChevronLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Image from "next/image";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import { closeChangePassword } from "../../redux/slices/profileSlice";
import { IUser } from "../../lib/interface";

interface ChangePasswordProp {
  owner: IUser
}

const ChangePassword = ({ owner }: ChangePasswordProp) => {
  const dispatch = useDispatch();
  return (
    <Overlay className={`max-sm:items-start max-sm:bg-white `}>
      <div className="bg-white rounded-md sm:w-1/2 w-full">
        <div className="flex items-center justify-between mb-2 px-4  py-3 border-b">
          <div
            onClick={() => dispatch(closeChangePassword(false))}
            className="cursor-pointer flex-1"
          >
            <BsChevronLeft className="w-5 h-5" />
          </div>
          <div className="font-semibold flex-1 basis-12">Change password</div>
        </div>

        <div className="px-4 py-6 flex gap-4 items-center justify-center">
          <Image
            src={owner?.profilePicture}
            width={50}
            height={50}
            alt={owner?.username}
            className="rounded-full w-[50px] !h-[50px] object-cover"
          />
          <h3 className="font-medium text-lg">{owner?.username}</h3>
        </div>
        <ChangePasswordForm />
      </div>
    </Overlay>
  );
};

export default ChangePassword;
