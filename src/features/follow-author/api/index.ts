import { post, deleteMethod } from '../../../shared/api';
import { ProfileResponse } from '../../../entities/user';

export const followUser = (username: string): Promise<ProfileResponse> =>
  post<ProfileResponse>(`/profiles/${username}/follow`);

export const unfollowUser = (username: string): Promise<ProfileResponse> =>
  deleteMethod<ProfileResponse>(`/profiles/${username}/follow`);
