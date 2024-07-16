import { Role, BasicStatus } from '@/enums';

export type UserToken = {
  accessToken?: string;
  refreshToken?: string;
};

export type UserInfo = {
  id: string;
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  role?: Role;
  status?: BasicStatus;
};
