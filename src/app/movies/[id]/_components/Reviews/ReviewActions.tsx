import { MoreVertical } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

interface ReviewActionsProps {
  hidden: boolean;
  handleShow: () => void;
  handleHide: () => void;
  handleDelete: () => void;
}

function ReviewActions({
  handleDelete, handleHide, handleShow, hidden,
}: ReviewActionsProps) {
  const renderMenuItem = () => {
    if (hidden) {
      return (
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleShow}
          data-qa-id="movie_review_show_button"
        >
          Показать
        </DropdownMenuItem>
      );
    }

    return (
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={handleHide}
        data-qa-id="movie_review_hide_button"
      >
        Скрыть
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-5" data-qa-id="movie_review_actions_button">
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {renderMenuItem()}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleDelete}
          data-qa-id="movie_review_delete_button"
        >
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ReviewActions;
