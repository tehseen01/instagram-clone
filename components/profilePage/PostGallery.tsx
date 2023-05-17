import Image from "next/image";
import Link from "next/link";
import { BsChatFill, BsFillHeartFill, BsImageAlt } from "react-icons/bs";
import { IUser } from "../../lib/interface";
import GalleryImg from "../common/GalleryImg";

interface IPostGalleryProps {
  data: IUser;
}

const PostGallery = ({ data }: IPostGalleryProps) => {
  return (
    <section className="border-t pb-16">
      {data?.posts && data?.posts?.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:p-5 p-2">
          {data?.posts.map((post) => (
            <GalleryImg post={post} key={post?._id} />
          ))}
        </div>
      ) : (
        <div className="p-5">
          <div className="flex items-center justify-center flex-col mx-8">
            <div className="rounded-full border md:p-6 p-4 border-black">
              <BsImageAlt className="md:w-16 md:h-16 w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold my-4">Share Photos</h2>
            <p className="text-center">
              When you share photos, they will appear on your profile.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostGallery;
