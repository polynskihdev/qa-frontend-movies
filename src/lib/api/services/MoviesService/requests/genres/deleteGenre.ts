import { AxiosCustomRequestConfig } from '@api/types';
import { Genre } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface DeleteGenreParams {
  id: number;
}

export type DeleteGenreConfig = AxiosCustomRequestConfig<DeleteGenreParams>;

export const deleteGenre = async ({ params, config }: DeleteGenreConfig) => MoviesClient.delete<Genre>(`/genres/${params.id}`, config);
