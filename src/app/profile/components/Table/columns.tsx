import { Payment } from '@lib/types';
import { cn } from '@lib/utils';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'movieId',
    header: () => <div className="w-full text-black text-center">Идентификатор фильма</div>,
    cell: ({ row }) => <div className="w-full text-center">{row.getValue('movieId')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="w-full text-black text-center">Количество билетов</div>,
    cell: ({ row }) => <div className="w-full text-center">{row.getValue('amount')}</div>,
  },
  {
    accessorKey: 'total',
    header: () => <div className="w-full text-black text-center">Счёт</div>,
    cell: ({ row }) => <div className="w-full text-center">{row.getValue('total')}</div>,
  },
  {
    accessorKey: 'status',
    header: () => <div className="w-full text-black text-center">Статус платежа</div>,
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
  {
    accessorKey: 'createdAt',
    header: () => <div className="w-full text-black text-center">Дата платежа</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = date.toLocaleDateString('ru-RU');

      return <div className="text-center">{formattedDate}</div>;
    },
  },
];

export default columns;
