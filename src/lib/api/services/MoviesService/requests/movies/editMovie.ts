import { AxiosCustomRequestConfig } from '@api/types';
import { Movie } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

type EditMovieParams = Omit<Movie, 'reviews' | 'createdAt' | 'rating' | 'genre'>

export type EditMovieConfig = AxiosCustomRequestConfig<EditMovieParams>;

export const editMovie = async ({ params, config }: EditMovieConfig) => {
  const response = await MoviesClient.patch<Movie>(`/movies/${params.id}`, params, config);

  return response.data;
};
