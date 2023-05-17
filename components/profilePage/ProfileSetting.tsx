import Overlay from "../common/Overlay";
import { useRouter } from "next/router";

import {
  closeProfileSetting,
  openChangePassword,
} from "../../redux/slices/profileSlice";
import { useAppDispatch } from "../../redux/store";

import { logoutUser } from "../../lib/utils/requests";

const ProfileSetting = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const logOut = () => {
    logoutUser();

    router.push("/auth/login");
  };

  return (
    <Overlay className="">
      <div className="bg-white rounded-md md:w-2/5 w-3/4">
        <div className="flex items-center gap-4 justify-center p-3 border-b">
          <button
            onClick={() => {
              dispatch(openChangePassword(true));
              dispatch(closeProfileSetting(false));
            }}
          >
            Change password
          </button>
        </div>
        <div className="flex items-center gap-4 justify-center p-3 border-b">
          <button onClick={logOut}>Logout</button>
        </div>
        <div className="flex items-center gap-4 justify-center p-3">
          <button onClick={() => dispatch(closeProfileSetting(false))}>
            Cancel
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default ProfileSetting;
