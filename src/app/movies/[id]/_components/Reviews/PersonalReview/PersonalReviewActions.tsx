'use client';

import { MoreVertical } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

interface PersonalReviewActionsProps {
  handleDelete: () => void;
  handleEdit: () => void;
}

function PersonalReviewActions({ handleDelete, handleEdit }: PersonalReviewActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-5" data-qa-id="movie_review_actions_button">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleEdit}
          data-qa-id="movie_review_action_edit_button"
        >
          Редактировать
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleDelete}
          data-qa-id="movie_review_action_delete_button"
        >
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PersonalReviewActions;
