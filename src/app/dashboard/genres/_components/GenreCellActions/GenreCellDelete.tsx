'use client';

import toast from 'react-hot-toast';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@components/ui/button';
import { DialogClose, DialogFooter, DialogHeader } from '@components/ui/dialog';

import { Genre } from '@lib/types';
import MoviesService from '@api/services/MoviesService/service';

function GenreCellDelete({ id, name }: Genre) {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ['deleteGenre'],
    () => MoviesService.deleteGenre({ params: { id } }),
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutateAsync();
      toast.success('Жанр успешно удален');
      queryClient.refetchQueries(['genres']);
      document.getElementById('closeDialog')?.click();
    } catch {
      toast.error('Не удалось удалить фильм');
    }
  };

  const warningText = `Вы уверены, что хотите удалить жанр "${name}"?`;

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader>Удаление жанра</DialogHeader>
      <div className="mt-5">
        <p>
          {warningText}
        </p>
        <p className="text-red-500 mt-3 text-sm">Фильмы с этим жанром тоже удалятся!</p>
      </div>
      <DialogFooter className="mt-5">
        <Button
          type="submit"
          variant="destructive"
          disabled={isLoading}
          data-qa-id="genre_delete_submit_button"
        >
          Удалить
        </Button>
        <DialogClose type="button" id="closeDialog" />
      </DialogFooter>
    </form>
  );
}

export default GenreCellDelete;
