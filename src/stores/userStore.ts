import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { SignInRequest } from '@/api/services/userService';
import { StorageEnum } from '@/enums';
import { UserInfo, UserToken } from '@/types';
import { getItem, removeItem, setItem } from '@/utils/storage';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

interface UserStore {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (userToken: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken: () => {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: userService.signIn,
  });

  const signIn = async (data: SignInRequest) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { user, refreshToken, accessToken } = res;
      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
      navigate(HOMEPAGE, { replace: true });
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        message.warning({
          content: error.message,
          duration: 3,
        });
      }
    }
  };

  return signIn;
};

export default useUserStore;
