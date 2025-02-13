import { AxiosCustomRequestConfig } from '@api/types';
import { User } from '@lib/types';
import AuthClient from '@api/services/AuthService/client';

export type GetUserInfoConfig = AxiosCustomRequestConfig;

export const getUserInfo = async ({ config }: GetUserInfoConfig) => {
  const response = await AuthClient.get<User>('/user/me', config);

  return response.data;
};
