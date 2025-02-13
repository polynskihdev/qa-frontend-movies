import { AxiosCustomRequestConfig } from '@api/types';
import { Review } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface EditReviewParams {
  movieId: number;
  text: string;
  rating: number;
}

export type EditReviewConfig = AxiosCustomRequestConfig<EditReviewParams>;

export const editReview = async ({ params, config }: EditReviewConfig) => MoviesClient.put<Review>(`/movies/${params.movieId}/reviews`, params, config);
