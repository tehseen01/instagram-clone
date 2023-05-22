import { useDebounce } from "use-debounce";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { searchUser } from "../../lib/utils/requests";
import Link from "next/link";

export const Searchbar = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceKeyword] = useDebounce(keyword, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setLoading(true);
  };

  useEffect(() => {
    if (debounceKeyword) {
      searchUser(debounceKeyword).then((data) => setSearchResult(data));
    }

    if (!debounceKeyword) {
      setSearchResult([]);
    }
  }, [debounceKeyword]);

  return (
    <div className="relative">
      <div className="m-2 relative">
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:border-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Search..."
          id="search"
          value={keyword}
          onChange={handleChange}
          autoComplete="off"
        />
        {debounceKeyword && (
          <div
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setKeyword("")}
          >
            <MdClose className="w-5 h-5" />
          </div>
        )}
      </div>
      {searchResult && searchResult?.length > 0 && (
        <div className="absolute top-12 left-0 bg-white z-50 w-full md:w-1/2 max-md:h-screen p-4 border-t">
          {searchResult?.map((user) => (
            <Link
              href="/[profile]"
              as={`/${user?.username}`}
              key={user?._id}
              className="flex items-center justify-center gap-2 mb-2 hover:bg-gray-100 p-2"
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

export default Searchbar;
