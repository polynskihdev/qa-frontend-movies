import { AxiosCustomRequestConfig } from '@api/types';
import { User } from '@lib/types';
import AuthClient from '@api/services/AuthService/client';

type RegisterUser = {
  email: string;
  fullName: string;
  password: string;
  passwordRepeat: string;
};

export type RegisterUserConfig = AxiosCustomRequestConfig<RegisterUser>;

export const register = async ({ params, config }: RegisterUserConfig) => AuthClient.post<User>('/register', params, config);
