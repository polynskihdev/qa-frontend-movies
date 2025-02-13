import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Button } from '@components/ui/button';
import {
  DialogClose, DialogFooter, DialogHeader, DialogTitle,
} from '@components/ui/dialog';

import { Movie } from '@lib/types';

import React from 'react';
import MoviesService from '@api/services/MoviesService/service';

type MovieCellDeleteProps = Pick<Movie, 'id' | 'name'>

function MovieCellDelete({ id, name }: MovieCellDeleteProps) {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ['deleteMovie'],
    () => MoviesService.deleteMovie({ params: { id } }),
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutateAsync();
      toast.success('Фильм успешно удален');
      queryClient.refetchQueries(['movies']);
      document.getElementById('closeDialog')?.click();
    } catch (error) {
      console.log(error);
      toast.error('Не удалось удалить фильм');
    }
  };

  const warningText = `Вы уверены, что хотите удалить фильм "${name}"?`;

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle>Удаление фильма</DialogTitle>
      </DialogHeader>

      <div className="mt-5">
        <p>
          {warningText}
        </p>
      </div>
      <DialogFooter className="mt-5">
        <Button
          type="submit"
          variant="destructive"
          disabled={isLoading}
          data-qa-id="movie_delete_button"
        >
          Удалить
        </Button>
        <DialogClose type="button" id="closeDialog" />
      </DialogFooter>
    </form>
  );
}

export default MovieCellDelete;
