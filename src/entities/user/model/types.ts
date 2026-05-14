export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface UserResponse {
  user: User;
}

export interface ProfileResponse {
  profile: Profile;
}
