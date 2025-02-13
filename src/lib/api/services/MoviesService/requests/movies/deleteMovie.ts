import { AxiosCustomRequestConfig } from '@api/types';
import { Movie } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface DeleteMovieParams {
  id: number;
}

export type DeleteMovieConfig = AxiosCustomRequestConfig<DeleteMovieParams>;

export const deleteMovie = async ({ params, config }: DeleteMovieConfig) => {
  const response = await MoviesClient.delete<Movie>(`/movies/${params.id}`, config);

  return response.data;
};
