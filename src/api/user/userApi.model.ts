import { UserInfo, UserToken } from '@/entities';

export type SignInRequest = {
  username: string;
  password: string;
}

export type SignUpRequest = SignInRequest & {
  email: string;
}
export type SignInResponse = UserToken & {
  user: UserInfo;
}
