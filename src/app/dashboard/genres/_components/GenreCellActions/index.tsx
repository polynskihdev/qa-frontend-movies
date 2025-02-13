'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';

import { Genre } from '@lib/types';
import GenreCellDelete from './GenreCellDelete';

interface MovieCellActionsProps {
  row: Row<Genre>;
}

function GenreCellActions({ row }: MovieCellActionsProps) {
  const genre = row.original;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center"
          data-qa-id="genre_actions_button"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer" data-qa-id="genre_delete_button">
              Удалить
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <GenreCellDelete {...genre} />
      </DialogContent>
    </Dialog>
  );
}

export default GenreCellActions;
