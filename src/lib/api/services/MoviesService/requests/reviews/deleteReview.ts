import { AxiosCustomRequestConfig } from '@api/types';
import { Review } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface DeleteReviewParams {
  movieId: number;
}

export type DeleteReviewConfig = AxiosCustomRequestConfig<DeleteReviewParams>;

export const deleteReview = async ({ params, config }: DeleteReviewConfig) => MoviesClient.delete<Review>(`/movies/${params.movieId}/reviews`, config);
