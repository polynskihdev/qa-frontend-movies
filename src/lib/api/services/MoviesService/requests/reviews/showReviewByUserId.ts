import { AxiosCustomRequestConfig } from '@api/types';
import { Review } from '@lib/types';
import MoviesClient from '@api/services/MoviesService/client';

export interface ShowReviewByUserIdParams {
  movieId: number;
  userId: string;
}

export type showReviewByUserIdConfig = AxiosCustomRequestConfig<ShowReviewByUserIdParams>;

export const showReviewByUserId = async ({ params, config }: showReviewByUserIdConfig) => MoviesClient.patch<Review>(`/movies/${params.movieId}/reviews/show/${params.userId}`, params, config);
