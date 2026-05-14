import { ApiError } from '../../../shared/api';
import { followUser, unfollowUser } from '../api';

export function useFollowAuthor(refetch: () => void) {
  const handleFollow = async (username: string, following: boolean) => {
    try {
      if (following) {
        await unfollowUser(username);
      } else {
        await followUser(username);
      }
      refetch();
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
    }
  };

  return { handleFollow };
}
