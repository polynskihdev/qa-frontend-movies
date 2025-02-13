import { Genre } from '@lib/types';
import { ColumnDef } from '@tanstack/react-table';
import GenreCellActions from '../GenreCellActions';

const columns: ColumnDef<Genre>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <div className="w-full text-center text-black">Id</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <div className="w-full text-center text-black">Название</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('name')}</div>,
  },
  {
    id: 'actions',
    cell: GenreCellActions,
  },
];

export default columns;
