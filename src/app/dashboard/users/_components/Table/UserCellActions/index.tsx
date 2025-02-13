'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { User } from '@lib/types';

import UserCellEdit from './UserCellEdit';

interface UserCellActionsProps {
  row: Row<User>;
}

function UserCellActions({ row }: UserCellActionsProps) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center"
          data-qa-id="user_actions_button"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer" data-qa-id="user_action_edit_button">
              Изменить
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <UserCellEdit {...row.original} />
      </DialogContent>
    </Dialog>
  );
}

export default UserCellActions;
