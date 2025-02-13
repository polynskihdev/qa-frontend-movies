'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';

import { Movie } from '@lib/types';
import MovieCellEdit from './MovieCellEdit';
import MovieCellDelete from './MovieCellDelete';

interface MovieCellActionsProps {
  row: Row<Movie>;
}

function MovieCellActions({ row }: MovieCellActionsProps) {
  const [dialog, setDialog] = useState<string | undefined>();

  const movie = row.original;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center"
          data-qa-id="movie_actions_button"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild onClick={() => setDialog('edit')}>
            <DropdownMenuItem className="cursor-pointer" data-qa-id="movie_action_edit_button">
              Изменить
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => setDialog('delete')}>
            <DropdownMenuItem className="cursor-pointer" data-qa-id="movie_action_delete_button">
              Удалить
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        {dialog === 'edit' && <MovieCellEdit {...movie} />}
        {dialog === 'delete' && <MovieCellDelete {...movie} />}
      </DialogContent>
    </Dialog>
  );
}

export default MovieCellActions;
