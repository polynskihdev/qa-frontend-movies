import { AxiosCustomRequestConfig } from '@api/types';
import AuthClient from '@api/services/AuthService/client';

export type RefreshTokensUserConfig = AxiosCustomRequestConfig;

type Tokens = {
  accessToken: string;
  expiresIn: number;
}

export const refreshTokens = async ({ config }: RefreshTokensUserConfig) => {
  const response = await AuthClient.get<Tokens>('/refresh-tokens', config);

  return response.data;
};
