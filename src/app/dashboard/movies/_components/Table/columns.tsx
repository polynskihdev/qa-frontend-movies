import { Movie } from '@lib/types';
import { ColumnDef } from '@tanstack/react-table';
import MovieCellActions from './MovieCellActions';

const columns: ColumnDef<Movie>[] = [
  {
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
    id: 'rating',
    accessorKey: 'rating',
    header: () => <div className="w-full text-center text-black">Рейтинг</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('rating')}</div>,
  },

  {
    id: 'price',
    accessorKey: 'price',
    header: () => <div className="w-full text-center text-black">Цена</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('price')}</div>,
  },

  {
    id: 'location',
    accessorKey: 'location',
    header: () => <div className="w-full text-center text-black">Место</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('location')}</div>,
  },

  {
    id: 'published',
    accessorKey: 'published',
    header: () => <div className="w-full text-center text-black">Опубликовано</div>,
    cell: ({ row }) => {
      const text = row.getValue('published') ? 'Да' : 'Нет';
      return <div className="text-center">{text}</div>;
    },
  },

  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: () => <div className="w-full text-center text-black">Дата создания</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = date.toLocaleDateString('ru-RU');

      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    id: 'actions',
    enableSorting: false,
    cell: MovieCellActions,
  },
];

export default columns;
