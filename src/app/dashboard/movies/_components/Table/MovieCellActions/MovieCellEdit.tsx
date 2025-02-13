import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { Movie } from '@lib/types';

import MoviesService from '@api/services/MoviesService/service';
import MovieDialogForm from '../../MovieDialogForm';
import { MovieFormSchema, movieFormSchema } from '../../MovieFormSchema';

function MovieCellEdit(movie: Movie) {
  const form = useForm<MovieFormSchema>({
    resolver: zodResolver(movieFormSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ['editMovie'],
    (data: MovieFormSchema) => MoviesService.editMovie({ params: { id: movie?.id, ...data } }),
  );

  const onSubmit: SubmitHandler<MovieFormSchema> = async (data) => {
    try {
      await mutateAsync(data);
      toast.success('Данные фильма изменены');
      document.getElementById('closeDialog')?.click();
      queryClient.refetchQueries(['movies']);
    } catch (error) {
      console.log(error);

      toast.error('Произошла ошибка');
    }
  };

  return (
    <MovieDialogForm
      title="Изменение фильма"
      description={'Измените данные фильма. Кликните на кнопку "Сохранить" для сохранения изменений.'}
      footerButtonText="Сохранить"
      {...form}
      isLoading={isLoading}
      onSubmit={onSubmit}
      movie={movie}
      errors={form.formState.errors}
    />
  );
}

export default MovieCellEdit;
