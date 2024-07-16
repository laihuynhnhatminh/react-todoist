import { UserInfo } from '@/entities';

import apiClient from '../apiClient';

import { UserApi } from './userApi.enum';
import { SignInRequest, SignInResponse, SignUpRequest } from './userApi.model';

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
