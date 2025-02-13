import { AxiosCustomRequestConfig } from '@api/types';
import { GetUsersParams, GetUsersResponse } from '@lib/types';
import AuthClient from '@api/services/AuthService/client';

export type GetUsersConfig = AxiosCustomRequestConfig<GetUsersParams>;

export const getUsers = async ({ params, config }: GetUsersConfig) => {
  const response = await AuthClient.get<GetUsersResponse>('/user', { params, ...config });

  return response.data;
};
