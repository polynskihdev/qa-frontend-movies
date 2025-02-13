import { AxiosCustomRequestConfig } from '@api/types';
import { Review } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface HideReviewByUserIdParams {
  movieId: number;
  userId: string;
}

export type hideReviewByUserIdConfig = AxiosCustomRequestConfig<HideReviewByUserIdParams>;

export const hideReviewByUserId = async ({ params, config }: hideReviewByUserIdConfig) => MoviesClient.patch<Review>(`/movies/${params.movieId}/reviews/hide/${params.userId}`, params, config);
