'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Review, Role } from '@lib/types';

import useSession from '@hooks/useSession';

import MoviesService from '@api/services/MoviesService/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ReviewCard from './ReviewCard';
import PersonalReview from './PersonalReview';
import ReviewActions from './ReviewActions';

interface ReviewsProps {
  reviews: Review[];
  movieId: number;
}

function Reviews({ reviews, movieId }: ReviewsProps) {
  const { session, isLogged } = useSession();
  const isAdmin = isLogged && session?.roles.indexOf(Role.ADMIN) !== -1;

  const personalReview = reviews?.find((review) => review.userId === session?.id);

  const shownReviews = reviews?.filter((review) => review.userId !== session?.id && !review.hidden);
  const hiddenReviews = reviews?.filter((review) => review.userId !== session?.id && review.hidden);

  const { mutateAsync: deleteReview } = useMutation(['deleteReview'], MoviesService.deleteReviewByUserId);
  const { mutateAsync: showReview } = useMutation(['showReview'], MoviesService.showReviewByUserId);
  const { mutateAsync: hideReview } = useMutation(['hideReview'], MoviesService.hideReviewByUserId);

  const queryClient = useQueryClient();

  const handleDelete = async (userId: string) => {
    const { status } = await deleteReview({ params: { movieId, userId } });

    if (status !== 200) {
      toast.error('Произошла ошибка');
      return;
    }

    toast.success('Отзыв успешно удален');
    queryClient.refetchQueries(['movieById']);
  };

  const handleShow = async (userId: string) => {
    const { status } = await showReview({ params: { movieId, userId } });

    if (status !== 200) {
      toast.error('Произошла ошибка');
      return;
    }

    toast.success('Отзыв успешно отображен');
    queryClient.refetchQueries(['movieById']);
  };

  const handleHide = async (userId: string) => {
    const { status } = await hideReview({ params: { movieId, userId } });

    if (status !== 200) {
      toast.error('Произошла ошибка');
      return;
    }

    toast.success('Отзыв успешно скрыт');
    queryClient.refetchQueries(['movieById']);
  };

  return (
    <div className="mt-10 w-[500px]">
      <h2 className="text-3xl">Отзывы:</h2>
      <div>
        {isLogged ? <PersonalReview review={personalReview} movieId={movieId} /> : null}
        {reviews.length === 0 ? (
          <p className="mt-10 text-2xl">Отзывов нет. Оставьте отзыв первым!</p>
        ) : (
          <ul className="mt-10 flex flex-col gap-5">
            {shownReviews?.map((review) => (
              <li key={review.userId}>
                <ReviewCard
                  {...review}
                  actions={
                    isAdmin ? (
                      <ReviewActions
                        hidden={review.hidden}
                        handleDelete={() => handleDelete(review.userId)}
                        handleHide={() => handleHide(review.userId)}
                        handleShow={() => handleShow(review.userId)}
                      />
                    ) : null
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {isAdmin && hiddenReviews.length ? (
        <div className="mt-10">
          <h3 className="text-2xl">Скрытые отзывы:</h3>
          <ul className="mt-5 flex flex-col gap-5">
            {hiddenReviews?.length ? (
              hiddenReviews?.map((review) => (
                <li key={review.userId}>
                  <ReviewCard
                    {...review}
                    actions={(
                      <ReviewActions
                        hidden={review.hidden}
                        handleDelete={() => handleDelete(review.userId)}
                        handleHide={() => handleHide(review.userId)}
                        handleShow={() => handleShow(review.userId)}
                      />
                    )}
                  />
                </li>
              ))
            ) : (
              <p className="text-xl">Скрытых отзывов нет</p>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Reviews;
