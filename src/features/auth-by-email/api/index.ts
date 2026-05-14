import { post } from '../../../shared/api';
import { UserResponse } from '../../../entities/user';

export const login = (email: string, password: string): Promise<UserResponse> =>
  post<UserResponse>('/users/login', { user: { email, password } });
