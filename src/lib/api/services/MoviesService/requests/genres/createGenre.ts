import { AxiosCustomRequestConfig } from '@api/types';
import { Genre } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface CreateGenreParams {
  name: string;
}

export type CreateGenreConfig = AxiosCustomRequestConfig<CreateGenreParams>;

export const createGenre = async ({ params, config }: CreateGenreConfig) => {
  const response = await MoviesClient.post<Genre>('/genres/', params, config);

  return response.data;
};
