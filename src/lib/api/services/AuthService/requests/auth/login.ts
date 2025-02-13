import { AxiosCustomRequestConfig } from '@api/types';
import { LoginResponse } from '@lib/types';
import AuthClient from '@api/services/AuthService/client';

type LoginUser = {
  email: string;
  password: string;
};

export type LoginUserConfig = AxiosCustomRequestConfig<LoginUser>;

export const login = async ({ params, config }: LoginUserConfig) => {
  const response = await AuthClient.post<LoginResponse>('/login', params, config);

  return response.data;
};
