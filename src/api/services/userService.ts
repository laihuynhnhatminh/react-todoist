import { UserInfo, UserToken } from '@/types';

import apiClient from '../apiClient';

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

export enum UserApi {
  SignIn = '/auth/signin',
  SignUp = '/auth/signup',
  SignOut = '/auth/signout',
  Refresh = '/auth/refresh',
  User = '/user',
}

const signIn = (data: SignInRequest) =>
  apiClient.post<SignInResponse>({ url: UserApi.SignIn, data });
const signUp = (data: SignUpRequest) =>
  apiClient.post<SignInResponse>({ url: UserApi.SignUp, data });
const signOut = () => apiClient.get({ url: UserApi.SignOut });
const findById = (id: string) => apiClient.get<UserInfo[]>({ url: `${UserApi.User}/${id}` });

export default {
  signIn,
  signUp,
  signOut,
  findById,
};
