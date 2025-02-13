import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import { Review } from '@lib/types';
import { cn } from '@lib/utils';
import { Textarea } from '@components/ui/textarea';
import { Button } from '@components/ui/button';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import MoviesService from '@api/services/MoviesService/service';

interface ReviewFormProps {
  review?: Review;
  movieId: number;
  closeForm: () => void;
}

interface ReviewInput {
  text: string;
  rating: number;
}

function ReviewForm({ movieId, review, closeForm }: ReviewFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
  } = useForm<ReviewInput>({
    defaultValues: {
      text: review?.text,
      rating: review?.rating,
    },
  });

  const { mutateAsync: editReview } = useMutation(['editReview'], MoviesService.editReview, {
    onSuccess: () => {
      toast.success('Отзыв успешно обновлен');
      queryClient.refetchQueries(['movieById']);
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });

  const { mutateAsync: createReview } = useMutation(['createReview'], MoviesService.createReview, {
    onSuccess: () => {
      toast.success('Отзыв успешно создан');
      queryClient.refetchQueries(['movieById']);
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });

  const onSubmit: SubmitHandler<ReviewInput> = async (data) => {
    const payload = {
      movieId,
      text: data.text,
      rating: Number(data.rating),
    };

    if (review?.text || review?.rating) {
      await editReview({ params: payload });
    } else {
      await createReview({ params: payload });
    }

    closeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        className={cn('outline rounded-md transition-all text-base min-h-[125px]')}
        placeholder="Написать отзыв"
        defaultValue={review?.text ?? ''}
        minLength={5}
        data-qa-id="movie_review_input"
        {...register('text', {
          required: 'Поле отзыва обязательно к заполнению',
        })}
      />
      <div className="mt-5 flex justify-between">
        <div className="flex items-center relative">
          <p className="text-lg mr-5">Оценка: </p>
          <div className="w-16">
            <Controller
              control={control}
              name="rating"
              defaultValue={review?.rating ?? 5}
              render={({ field }) => (
                <Select value={field.value.toString()} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Оценка" data-qa-id="movie_rating_select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={rating}
                        value={rating.toString()}
                        onSelect={field.onChange}
                      >
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-fit" data-qa-id="movie_review_submit_button">
          {review?.text || review?.rating ? 'Сохранить' : 'Отправить'}
        </Button>
      </div>
    </form>
  );
}

export default ReviewForm;
