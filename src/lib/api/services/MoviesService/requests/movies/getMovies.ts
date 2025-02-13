import { AxiosCustomRequestConfig } from '@api/types';
import { GetMoviesResponse } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface GetMoviesParams {
  page?: number | string;
  pageSize?: number | string;
  genreId?: number | string;
  name?: string;
  createdAt?: string;
  published?: boolean | string;
}

export type GetMoviesConfig = AxiosCustomRequestConfig<GetMoviesParams>;

export const getMovies = async ({ params, config }: GetMoviesConfig) => {
  const response = await MoviesClient.get<GetMoviesResponse>('/movies', { params, ...config });

  return response.data;
};
