import { UserInfo } from '@/types';

import apiClient from '../apiClient';
import { SignInRequest, SignInResponse, SignUpRequest } from '../models/user';
import { UserApi } from '../enums/user';

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
