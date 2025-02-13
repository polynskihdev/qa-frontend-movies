import { AxiosCustomRequestConfig } from '@api/types';
import { Genre } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export type GetGenresConfig = AxiosCustomRequestConfig;

export const getGenres = async ({ config }: GetGenresConfig) => {
  const response = await MoviesClient.get<Genre[]>('/genres', config);

  return response.data;
};
