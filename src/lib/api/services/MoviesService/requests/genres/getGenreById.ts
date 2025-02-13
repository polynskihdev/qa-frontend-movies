import { AxiosCustomRequestConfig } from '@api/types';
import { Genre } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface GetGenreByIdParams {
  id: string;
}

export type GetGenreByIdConfig = AxiosCustomRequestConfig<GetGenreByIdParams>;

export const getGenreById = async ({ params, config }: GetGenreByIdConfig) => {
  const response = await MoviesClient.get<Genre>(`/genres/${params.id}`, config);

  return response.data;
};
