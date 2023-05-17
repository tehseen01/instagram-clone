import Image from "next/image";
import { BsSend } from "react-icons/bs";

const Header = () => {
  return (
    <header className="flex items-center md:hidden py-3 px-2 border-b border-gray-200">
      <div className="md:hidden flex-1 flex justify-center">
        <Image src="/logo-text.svg" width={100} height={100} alt="logo" />
      </div>

      <div className="flex items-center">
        <div>
          <BsSend className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
