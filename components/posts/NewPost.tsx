import { MdClose } from "react-icons/md";
import { BsChevronLeft, BsImages } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleImage } from "../../lib/utils/handleImage";
import { closeNewPostModal } from "../../redux/slices/modalSlice";
import Spinner from "../loaders/Spinner";
import { useRouter } from "next/router";
import { createPost } from "../../lib/utils/requests";

const NewPost = () => {
  const router = useRouter();
  const { profile } = router.query;

  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImage(e, setImage);
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", profile],
      });
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ caption, image });
  };

  if (isError) {
    console.log(error);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeNewPostModal(false));
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center overlay max-h-screen sm:py-6">
      <button
        className="block absolute md:top-5 top-2 right-5 z-20 sm:text-white"
        onClick={() => dispatch(closeNewPostModal(false))}
      >
        <MdClose className="w-6 h-6" />
      </button>
      <div
        className={`h-[350px] bg-white md:rounded-md w-full ${
          image ? "max-md:h-full md:w-[80%]" : "sm:w-[350px]"
        }`}
      >
        <div className="flex items-center justify-between border-b p-2">
          {image && (
            <button
              onClick={() => {
                setImage(""), setCaption("");
              }}
            >
              <BsChevronLeft className="w-5 h-5" />
            </button>
          )}
          <p className="flex-1 text-center  font-medium">Create new post</p>
        </div>
        {image ? (
          <form
            className="grid sm:grid-cols-2 grid-cols-1 gap-4 newPost-h max-md:grid-rows-2 md:auto-rows-[100%]"
            onSubmit={submitHandler}
          >
            <div>
              <Image
                src={image}
                width={100}
                height={100}
                alt="new post"
                className="object-cover w-full !h-full"
                priority
              />
            </div>
            <div className="max-md:flex flex-col">
              <textarea
                placeholder="Caption..."
                className="w-full px-4 py-2 border-b border-gray-300 border-0 focus:ring-0 focus:outline-none resize-none md:h-60 flex-1"
                value={caption}
                rows={5}
                onChange={(e) => setCaption(e.target.value)}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-400 rounded-md py-1 px-4 text-white block ml-auto mr-6 mt-2 hover:bg-blue-500 max-md:m-4"
              >
                {isLoading ? <Spinner className="w-5 h-5" /> : "Share"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-center flex-col gap-4">
            <BsImages className="w-12 h-12 my-6" />
            <label
              htmlFor="file"
              className="px-4 py-2 bg-blue-400 rounded-xl text-white cursor-pointer hover:bg-blue-500"
            >
              Choose File
            </label>
            <input
              type="file"
              className="hidden"
              id="file"
              name="file"
              accept="image/*"
              onChange={onImageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPost;
