import { AxiosCustomRequestConfig } from '@api/types';
import { Review } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface DeleteReviewByUserIdParams {
  movieId: number;
  userId: string;
}

export type deleteReviewByUserIdConfig = AxiosCustomRequestConfig<DeleteReviewByUserIdParams>;

export const deleteReviewByUserId = async ({ params, config }: deleteReviewByUserIdConfig) => MoviesClient.delete<Review>(`/movies/${params.movieId}/reviews?userId=${params.userId}`, config);
