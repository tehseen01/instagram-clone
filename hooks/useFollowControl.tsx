import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { followOrUnFollowUser } from "../lib/requests";
import { IError } from "../lib/interface";

export const useFollowControl = () => {
  const queryClient = useQueryClient();

  const follow = useMutation(followOrUnFollowUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data.message);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return { follow };
};
