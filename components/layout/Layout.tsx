import { ReactNode } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import NewPost from "../posts/NewPost";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import LikeModal from "../modals/LikeModal";
import { useAppSelector } from "../../redux/store";
import { getProfile } from "../../lib/requests";
import Error from "../../pages/_error";

interface ILayoutProp {
  children: ReactNode;
}

interface IErrorProp {
  status: number;
  message: string;
}

const Layout = ({ children }: ILayoutProp) => {
  const { isOpenNewPostModal, isOpenLikeModal } = useAppSelector(
    (state) => state.modal
  );

  const router = useRouter();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
    onError: (error: IErrorProp) => {
      if (error.status === 401) {
        router.push("/auth/login");
      }
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error.status !== 401) {
    return <Error statusCode={error.status} message={error.message} />;
  }

  const excludedRoute = ["/auth/login", "/auth/signup"];

  const showLayout = !excludedRoute.includes(router.pathname);

  return (
    <>
      {showLayout && <Sidebar data={data} />}
      {isOpenNewPostModal && <NewPost />}
      {children}

      {isOpenLikeModal && <LikeModal />}
    </>
  );
};

export default Layout;
