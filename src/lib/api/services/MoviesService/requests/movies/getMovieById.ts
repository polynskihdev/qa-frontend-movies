import { AxiosCustomRequestConfig } from '@api/types';
import { Movie, Review } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface GetMovieByIdParams {
  id: number;
}

export type GetMovieByIdConfig = AxiosCustomRequestConfig<GetMovieByIdParams>;

export const getMovieById = async ({ params, config }: GetMovieByIdConfig) => {
  const response = await MoviesClient.get<Movie & { reviews: Review[] }>(`/movies/${params.id}`, config);

  return response.data;
};
