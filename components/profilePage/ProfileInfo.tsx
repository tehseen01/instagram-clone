import Image from "next/image";
import { BsChevronLeft, BsGearWide, BsThreeDots } from "react-icons/bs";
import PostsFollowsCount from "./PostsFollowsCount";
import ProfileButtons from "./ProfileButtons";
import { useRouter } from "next/router";
import useWindowSize from "../../hooks/useWindowSize";
import { useAppDispatch } from "../../redux/store";
import { openProfileSetting } from "../../redux/slices/profileSlice";
import { IUser } from "../../lib/interface";

interface IProfileInfoProps {
  owner: IUser
  data: IUser
  editProfile: () => void
}

const ProfileInfo = ({ editProfile, owner, data }: IProfileInfoProps) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { width } = useWindowSize();

  return (
    <section className="md:p-8">
      <div className="md:hidden flex items-center justify-between mb-2 px-4  py-3 max-md:border-b">
        <div onClick={() => router.back()} className="cursor-pointer">
          <BsChevronLeft className="w-5 h-5" />
        </div>
        <div className="font-semibold">{data?.username}</div>
        <div>
          <BsThreeDots className="w-5 h-5" />
        </div>
      </div>
      {/* PROFILE INFO */}
      <div className="grid md:col-30-70 max-md:col-25-auto gap-x-6 items-center max-md:px-4 max-md:py-2">
        <div className="w-20 !h-20 md:w-48 md:!h-48">
          <Image
            src={data?.profilePicture || "/blank-profile.jpg"}
            alt={data?.username}
            width={250}
            height={250}
            className="w-20 !h-20 md:w-48 md:!h-48 object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="gap-4 md:gap-10 flex">
            {/* EDIT PROFILE */}
            <h1 className="font-medium text-xl break-all">{data?.username}</h1>
            {width > 768 && (
              <ProfileButtons
                editProfile={editProfile}
                owner={owner}
                profileData={data}
              />
            )}
            {data?._id === owner._id ? (
              <button onClick={() => dispatch(openProfileSetting(true))}>
                <BsGearWide className="w-6 h-6" />
              </button>
            ) : (
              <button>
                {" "}
                <BsThreeDots className="w-5 h-5" />
              </button>
            )}
          </div>
          {width < 768 && (
            <ProfileButtons
              editProfile={editProfile}
              owner={owner}
              profileData={data}
            />
          )}
          {/* POST FOLLOWERS FOLLOWINGS */}
          {width > 768 && <PostsFollowsCount data={data} />}

          {/*  DESKTOP PROFILE BIO */}
          <div className="hidden md:block">
            <h1 className="capitalize font-semibold ">{data?.name}</h1>
            <p className="md:full-row md:w-[60%]">{data?.bio || ""}</p>
          </div>
        </div>

        {/*  MOBILE PROFILE BIO */}
        <div className="md:hidden col-span-2 mt-3">
          <h1 className="capitalize font-semibold">{data?.name}</h1>
          <p className="md:full-row md:w-[60%]">{data?.bio || ""}</p>
        </div>
      </div>

      {width < 768 && (
        <div className="border-t mt-2 px-4">
          <PostsFollowsCount data={data} />
        </div>
      )}
    </section>
  );
};

export default ProfileInfo;
