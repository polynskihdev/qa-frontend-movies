import { Payment } from '@lib/types';
import { cn } from '@lib/utils';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Payment>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <div className="text-center text-black">Id</div>,
    cell: ({ row }) => <div className="text-centermax-w-[80px]">{row.getValue('id')}</div>,
  },

  {
    id: 'userId',
    accessorKey: 'userId',
    header: () => <div className="text-center text-black">User Id</div>,
    cell: ({ row }) => (
      <div className="text-center truncate max-w-[150px] mx-auto">{row.getValue('userId')}</div>
    ),
  },

  {
    id: 'movieId',
    accessorKey: 'movieId',
    header: () => <div className="text-center text-black">Movie Id</div>,
    cell: ({ row }) => <div className="text-center truncate ">{row.getValue('movieId')}</div>,
  },

  {
    id: 'total',
    accessorKey: 'total',
    header: () => <div className="text-center text-black">К оплате</div>,
    cell: ({ row }) => <div className="text-center truncate">{row.getValue('total')}</div>,
  },

  {
    id: 'amount',
    accessorKey: 'amount',
    header: () => <div className="text-center text-black">Количество билетов</div>,
    cell: ({ row }) => <div className="text-center truncate">{row.getValue('amount')}</div>,
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
    id: 'status',
    accessorKey: 'status',
    header: () => <div className="w-full text-center text-black">Статус</div>,
    cell: ({ row }) => {
      const status = row.getValue('status');

      const isSuccess = status === 'SUCCESS';

      return (
        <div className={cn('text-center', isSuccess ? 'text-green-600' : 'text-red-600')}>
          {row.getValue('status')}
        </div>
      );
    },
  },
];

export default columns;
