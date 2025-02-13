import { AxiosCustomRequestConfig } from '@api/types';
import { Movie } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

type CreateMovieParams = Omit<Movie, 'id' | 'reviews' | 'createdAt' | 'rating' | 'genre'>

export type CreateMovieConfig = AxiosCustomRequestConfig<CreateMovieParams>;

export const createMovie = async ({ params, config }: CreateMovieConfig) => {
  const response = await MoviesClient.post<Movie>('/movies', params, config);

  return response.data;
};
