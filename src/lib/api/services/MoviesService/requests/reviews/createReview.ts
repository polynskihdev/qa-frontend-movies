import { AxiosCustomRequestConfig } from '@api/types';
import { Review } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface CreateReviewParams {
  movieId: number;
  text: string;
  rating: number;
}

export type CreateReviewConfig = AxiosCustomRequestConfig<CreateReviewParams>;

export const createReview = async ({ params, config }: CreateReviewConfig) => MoviesClient.post<Review>(`/movies/${params.movieId}/reviews`, params, config);
