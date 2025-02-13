import { AxiosCustomRequestConfig } from '@api/types';
import AuthClient from '@api/services/AuthService/client';

export type LogoutUserConfig = AxiosCustomRequestConfig;

export const logout = async ({ config }: LogoutUserConfig) => AuthClient.get('/logout', config);
