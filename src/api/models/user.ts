import { UserInfo, UserToken } from '@/types';

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest extends SignInRequest {
  email: string;
}
export interface SignInResponse extends UserToken {
  user: UserInfo;
}
