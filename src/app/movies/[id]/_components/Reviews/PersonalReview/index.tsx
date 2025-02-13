'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Review } from '@lib/types';

import useSession from '@hooks/useSession';

import MoviesService from '@api/services/MoviesService/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PersonalReviewActions from './PersonalReviewActions';
import ReviewCard from '../ReviewCard';
import ReviewForm from './ReviewForm';

interface PersonalReviewProps {
  review?: Review;
  movieId: number;
}

function PersonalReview({ review, movieId }: PersonalReviewProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { session } = useSession();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteReview } = useMutation(
    ['deleteReview'],
    () => MoviesService.deleteReview({ params: { movieId } }),
  );

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteReview();
      toast.success('Отзыв успешно удален');
    } catch (error) {
      console.log(error);

      toast.error('Произошла ошибка');
    }

    queryClient.refetchQueries(['movieById']);
  };

  if (!session) {
    return (
      <p className="mt-5 text-xl">
        <Link className="underline" href="/login">
          Войдите
        </Link>
        , чтобы оставить отзыв
      </p>
    );
  }

  return (
    <div className="w-full mt-5">
      {isFormOpen || !review ? (
        <ReviewForm review={review} movieId={movieId} closeForm={closeForm} />
      ) : (
        <ReviewCard
          {...review}
          hidden={false}
          actions={<PersonalReviewActions handleDelete={handleDelete} handleEdit={openForm} />}
        />
      )}
    </div>
  );
}

export default PersonalReview;
