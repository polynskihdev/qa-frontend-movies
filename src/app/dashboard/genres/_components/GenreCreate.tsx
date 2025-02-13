'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';

import LoadingSpinner from '@components/LoadingSpinner';

import MoviesService from '@api/services/MoviesService/service';
import { GenreFormSchema, genreFormSchema } from './GenreFormSchema';

function GenreCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenreFormSchema>({ resolver: zodResolver(genreFormSchema) });

  const queryClient = useQueryClient();

  const { mutateAsync: createGenre, isLoading } = useMutation(
    ['createGenre'],
    (name: string) => MoviesService.createGenre({ params: { name } }),
  );

  const onSubmit: SubmitHandler<GenreFormSchema> = async (data) => {
    try {
      await createGenre(data.name);
      toast.success('Жанр успешно создан');
      queryClient.refetchQueries(['genres']);
      document.getElementById('closeDialog')?.click();
    } catch (error: any) {
      if (error.status === 409) {
        toast.error('Жанр с таким названием уже существует');
        return;
      }

      toast.error('Что-то пошло не так');
    }
  };

  const description = 'Введите название. Кликните на кнопку "Создать" для создания.';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600" data-qa-id="genre_create_button">
          Создать жанр
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>Создание жанра</DialogHeader>
          <DialogDescription>
            {description}
          </DialogDescription>
          <div className="mt-3">
            <Label>Название</Label>
            <Input
              id="name"
              type="text"
              {...register('name', { required: true })}
              data-qa-id="genre_create_name_input"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <DialogFooter className="mt-3">
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              type="submit"
              disabled={isLoading}
              data-qa-id="genre_create_submit_button"
            >
              {isLoading ? <LoadingSpinner size={16} /> : 'Создать'}
            </Button>
            <DialogClose id="closeDialog" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default GenreCreate;
