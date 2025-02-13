import { AxiosCustomRequestConfig } from '@api/types';
import { User } from '@lib/types';
import AuthClient from '@api/services/AuthService/client';

type EditUserParams = Pick<User, 'id' | 'verified' | 'roles' | 'banned'>;

export type EditUserConfig = AxiosCustomRequestConfig<EditUserParams>;

export const editUser = async ({ params, config }: EditUserConfig) => {
  const response = await AuthClient.patch<User>(`/user/${params.id}`, params, config);

  return response.data;
};
