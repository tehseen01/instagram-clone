import React, { Suspense } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { closeLikeModal } from "../../redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IUser } from "../../lib/interface";

const LikeModal = () => {
  const dispatch = useAppDispatch();
  const { likesUser } = useAppSelector((state) => state.modal);

  const handelOverlayClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains("overlay")) {
      dispatch(closeLikeModal(false));
    }
  };

  return (
    <div
      className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 overlay"
      onClick={handelOverlayClose}
    >
      <div className="bg-white sm:w-[400px] h-[400px] w-72 rounded-md overflow-hidden">
        {/* MODAL HEADER */}
        <div className="border-b p-2 flex items-center">
          <h2 className="text-xl font-medium text-center flex-1">Likes</h2>
          <button onClick={() => dispatch(closeLikeModal(false))} className="">
            <MdClose />
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div className="p-2  overflow-y-scroll h-full">
          {likesUser.length > 0 &&
            likesUser.map((user: IUser) => (
              <Suspense fallback={<div>loading...</div>}>
                <div key={user._id} className="flex items-center gap-2 mb-2">
                  <Image
                    src={user?.profilePicture || "/blank-profile.jpg"}
                    width={55}
                    height={55}
                    alt={user?.username}
                  />
                  <div className="flex-1">
                    <span className="font-bold">{user?.username}</span>
                    <p className="text-gray-500">{user?.name}</p>
                  </div>
                  <button className="bg-blue-400 text-white px-2 py-1 rounded-md">
                    follow
                  </button>
                </div>
              </Suspense>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LikeModal;
