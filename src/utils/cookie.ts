import Cookies from 'universal-cookie';

import { CookieEnum } from '@/enums';

import { isDev } from './common';

const cookies = new Cookies(null, {
  path: '/',
  expires: new Date(Date.now() + 60 * 60 * 1000),
  secure: !isDev(),
});

export const getCookieItem = <T>(key: CookieEnum, parse?: boolean): T | null => {
  let value = null;

  try {
    const result = cookies.get(key, { doNotParse: !parse });
    if (result) {
      value = result;
    }
  } catch (error) {
    console.error(error);
  }

  return value;
};

export const setCookieItem = <T>(key: CookieEnum, value: T): void => {
  cookies.set(key, value);
};

export const removeCookieItem = (key: CookieEnum): void => {
  cookies.remove(key);
};

export const clearCookieItems = () => {
  const allCookies = cookies.getAll();
  Object.keys(allCookies).forEach((cookieName) => cookies.remove(cookieName, { path: '/' }));
};
