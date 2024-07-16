import { UserInfo, UserToken } from '@/entities';

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
