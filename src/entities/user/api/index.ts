import { get } from "../../../shared/api";
import { ProfileResponse, UserResponse } from "../model/types";

export const getCurrentUser = (): Promise<UserResponse> => get<UserResponse>("/user");

export const getProfile = (username: string): Promise<ProfileResponse> => get<ProfileResponse>(`/profiles/${username}`);
