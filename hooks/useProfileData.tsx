import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../lib/requests";
import { toast } from "react-toastify";
import { IError } from "../lib/interface";

export const useProfileData = () => {
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    onError: (error: IError) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return { userData, userLoading };
};
