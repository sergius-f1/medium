import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

import { ApiError } from "../../../shared/api";
import { followUser, unfollowUser } from "../api";

interface HandleFollowParams {
  username: string;
  following: boolean;
}

interface UseFollowAuthorResult {
  handleFollow: (params: HandleFollowParams) => void;
  isPending: boolean;
}

/**
 * Used for following/unfollowing an author
 * @param onSuccess
 */
export function useFollowAuthor(onSuccess?: () => void): UseFollowAuthorResult {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ username, following }: HandleFollowParams) => {
      if (following) {
        return unfollowUser(username);
      }
      return followUser(username);
    },
    onSuccess,
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        toast.error("Failed to follow author");
      }
    },
  });

  return { handleFollow: mutate, isPending };
}
