import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsSearch } from "react-icons/bs";
import { searchUser } from "../../lib/requests";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { accessChat } from "../../lib/requests/chat";
import { useRouter } from "next/router";

export const SearchUser = () => {
  const router = useRouter();
  const [inputFocus, setInputFocus] = useState(false);
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (keyword) {
      searchUser(keyword).then((data) => setSearchResult(data));
    }
    if (!keyword) {
      setSearchResult([]);
    }
  }, [keyword]);

  const handleSearchIconClick = () => {
    inputRef.current.focus();
  };

  const { mutate } = useMutation({
    mutationFn: accessChat,
  });

  const handleClick = (userId: string) => {
    mutate(userId);
    setKeyword("");
  };

  return (
    <div className="p-2 relative flex items-center gap-2">
      <Link href={"/"} className="md:hidden">
        <BsChevronLeft className="w-5 h-5" />
      </Link>
      <div
        className={`flex items-center border border-gray-500 rounded-md flex-1 ${
          inputFocus ? "ring-1 ring-offset-1 ring-gray-500" : ""
        }`}
      >
        <div
          className="flex items-center justify-center pl-1"
          onClick={handleSearchIconClick}
        >
          <BsSearch className="w-5 h-5" />
        </div>
        <input
          className="flex h-8 w-full rounded-md border-none  bg-transparent py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
          type="search"
          placeholder="Search"
          ref={inputRef}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          value={keyword}
          onChange={handleChange}
        />
      </div>
      {searchResult && searchResult?.length > 0 && (
        <div className="absolute top-16 left-0 bg-white z-50 w-full overflow-y-scroll h-[calc(100vh_-_65px)] p-4 border-t">
          {searchResult?.map((user) => (
            <Link
              href={`/chat/${user?._id}`}
              key={user?._id}
              className="flex items-center justify-center gap-2 mb-2 hover:bg-gray-100 p-2"
              onClick={() => handleClick(user?._id)}
            >
              <Image
                src={user?.profilePicture || "/blank-profile.jpg"}
                width={100}
                height={100}
                alt={user?.name}
                className="rounded-full w-11 !h-11 object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{user?.username}</h2>
                <h3 className="text-slate-500">{user?.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
