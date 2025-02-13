'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { Button } from '@components/ui/button';

import MoviesService from '@api/services/MoviesService/service';
import MovieDialogForm from './MovieDialogForm';
import { MovieFormSchema, movieFormSchema } from './MovieFormSchema';

function MovieCreate() {
  const form = useForm<MovieFormSchema>({ resolver: zodResolver(movieFormSchema) });

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ['createMovie'],
    (data: MovieFormSchema) => MoviesService.createMovie({ params: data }),
  );

  const onSubmit: SubmitHandler<MovieFormSchema> = async (data) => {
    try {
      await mutateAsync(data);

      toast.success('Фильм успешно добавлен');
      document.getElementById('closeDialog')?.click();
      queryClient.refetchQueries(['movies']);
    } catch (e: any) {
      if (e.status === 409) {
        toast.error('Фильм с таким названием уже существует');
        return;
      }

      toast.error('Что-то пошло не так');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          type="button"
          data-qa-id="movie_create_button"
        >
          Добавить фильм
        </Button>
      </DialogTrigger>
      <DialogContent>
        <MovieDialogForm
          title="Добавление фильма"
          description={'Внесите данные фильма. Кликните на кнопку "Отправить" для добавления.'}
          footerButtonText="Отправить"
          {...form}
          errors={form.formState.errors}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default MovieCreate;
