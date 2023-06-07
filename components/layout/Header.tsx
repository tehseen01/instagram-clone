import Image from "next/image";
import Link from "next/link";
import { BsSend } from "react-icons/bs";

const Header = () => {
  return (
    <header className="flex items-center md:hidden py-3 px-2 border-b border-gray-200">
      <div className="md:hidden flex-1 flex justify-center">
        <Image src="/logo-text.svg" width={100} height={100} alt="logo" />
      </div>

      <div className="flex items-center">
        <Link href={"/chat"}>
          <BsSend className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
