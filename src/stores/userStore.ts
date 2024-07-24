import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import { SignInRequest } from '@/api/user/userApi.model';
import userService from '@/api/user/userApi.service';
import { UserInfo, UserToken } from '@/entities';
import { CookieEnum, StorageEnum } from '@/enums';
import { getCookieItem, removeCookieItem, setCookieItem } from '@/utils/cookie';
import { getStorageItem, removeStorageItem, setStorageItem } from '@/utils/storage';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (userToken: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getStorageItem<UserInfo>(StorageEnum.User) || {},
  userToken: getCookieItem<UserToken>(CookieEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setStorageItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setCookieItem(CookieEnum.Token, userToken);
    },
    clearUserInfoAndToken: () => {
      set({ userInfo: {}, userToken: {} });
      removeStorageItem(StorageEnum.User);
      removeCookieItem(CookieEnum.Token);
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
