import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { FiLogOut, FiSearch } from "react-icons/fi";
import {
  BsHeart,
  BsSend,
  BsHouse,
  BsPlusCircle,
  BsFillHeartFill,
  BsSendFill,
} from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { RiSearch2Fill } from "react-icons/ri";

import { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useDispatch } from "react-redux";
import { IUser } from "../../lib/interface";
import { openNewPostModal } from "../../redux/slices/modalSlice";
import { logoutUser } from "../../lib/requests";

interface SideBarProp {
  data: IUser;
}

const Sidebar = ({ data }: SideBarProp) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [tab, setTab] = useState<string | undefined>(undefined);

  const logOut = () => {
    logoutUser();

    router.push("/auth/login");
  };

  useEffect(() => {
    setTab((prevState) => window.location.pathname);
  }, []);

  return (
    <section
      className={`fixed md:left-0 md:top-0 xl:w-60 md:w-20 bottom-0 left-0 md:p-4 xl:p-5  max-md:border-t bg-white transition-all ease-in max-md:z-20 border-r`}
    >
      {/* Sidebar logo */}
      <div className="hidden md:flex max-xl:justify-center pb-8 pt-4">
        <Link href={"/"} className="flex gap-2">
          <div className={`!block xl:hidden`}>
            <Image src="/logo.svg" alt="logo" width={24} height={24} />
          </div>
          <div className={`hidden xl:block`}>
            <Image
              src="/logo-text.svg"
              alt="logo text"
              width={100}
              height={100}
            />
          </div>
        </Link>
      </div>

      {/* User -- Profile */}
      <SidebarProfile data={data} />

      {/* Sidebar links */}
      <div className="flex md:flex-col max-xl:items-center gap-2 max-md:w-screen md:justify-between justify-around max-md:px-4 max-md:py-2 hideChild3">
        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md">
          <Link
            href={"/"}
            className="flex items-center gap-3"
            onClick={() => setTab("/")}
          >
            {tab === "/" ? (
              <MdHomeFilled className="w-6 h-6" />
            ) : (
              <BsHouse className="w-6 h-6" />
            )}
            <span className={`hidden xl:block`}>Home</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md">
          <Link
            href={"/explore"}
            className="flex items-center gap-3"
            onClick={() => setTab("/explore")}
          >
            {tab === "/explore" ? (
              <RiSearch2Fill className="w-6 h-6" />
            ) : (
              <FiSearch className="w-6 h-6" />
            )}
            <span className={`hidden xl:block`}>Explore</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md">
          <Link
            href={"/notification"}
            className="flex items-center gap-3"
            onClick={() => setTab("/notification")}
          >
            {tab === "/notification" ? (
              <BsFillHeartFill className="w-6 h-6" />
            ) : (
              <BsHeart className="w-6 h-6" />
            )}
            <span className={`hidden xl:block`}>Notification</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md">
          <Link
            href={"/"}
            className="flex items-center gap-3"
            onClick={() => setTab("/")}
          >
            {tab === "/message" ? (
              <BsSendFill className="w-6 h-6" />
            ) : (
              <BsSend className="w-6 h-6" />
            )}
            <span className={`hidden xl:block`}>Messages</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => dispatch(openNewPostModal(true))}
          >
            <BsPlusCircle className="w-6 h-6" />
            <span className={`hidden xl:block`}>Create</span>
          </div>
        </div>

        <Link
          className="xl:hidden cursor-pointer md:pt-2"
          href="/[profile]"
          as={`/${data?.username}`}
        >
          <Image
            src={data?.profilePicture || "/blank-profile.jpg"}
            alt={data?.username || "username"}
            width={150}
            height={150}
            className="rounded-full object-cover w-6 !h-6"
          />
        </Link>
      </div>

      {/*  User -- Logout Container */}
      <div className="md:block hidden mt-10 pt-6 border-t relative xl:mt-2 xl:pt-2">
        <div
          className="md:flex items-center gap-3 max-xl:justify-center hover:bg-gray-100 p-2 rounded-md cursor-pointer"
          onClick={logOut}
        >
          <FiLogOut className="w-6 h-6" />
          <span className={`hidden xl:block`}>Logout</span>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
