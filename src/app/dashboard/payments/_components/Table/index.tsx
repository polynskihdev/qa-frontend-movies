'use client';

import { useEffect } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Button } from '@components/ui/button';

import { useQuery } from '@tanstack/react-query';
import PaymentService from '@api/services/PaymentService/service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@components/LoadingSpinner';
import columns from './columns';

const initialData = {
  payments: [],
  pageCount: 0,
  count: 0,
  page: 0,
  pageSize: 0,
};

function PaymentsTable() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsString = searchParams.toString();

  const {
    data,
    isFetching,
    isError,
  } = useQuery(
    ['payments', paramsString],
    () => PaymentService.getPayments({
      params:
        Object.fromEntries(new URLSearchParams(paramsString)),
    }),
    {
      initialData,
    },
  );

  const { payments, pageCount } = data ?? initialData;

  const table = useReactTable({
    data: payments ?? initialData.payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount,
    rowCount: payments.length,
  });

  const updateParam = (name: string, value: string) => {
    const updatedParams = new URLSearchParams(paramsString);
    updatedParams.set('page', '1');
    updatedParams.set(name, String(value));

    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  const page = Number(searchParams.get('page') ?? 0);

  useEffect(() => {
    if (router) {
      updateParam('page', '1');
    }
  }, [router]);

  if (isFetching) {
    return (
      <div className="mt-36">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  if (isError) {
    return <p className="text-xl mt-36 text-center">Что-то пошло не так</p>;
  }

  const paginationText = `Страница ${page} из ${pageCount}`;

  return (
    <>
      <div className="rounded-md border mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-white bg-transparent">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-black">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {payments.length ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-black">
            <p className="text-sm">{paginationText}</p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="text-black"
              onClick={() => updateParam('page', String(page - 1))}
              disabled={page === 1}
            >
              Назад
            </Button>
            <Button
              variant="outline"
              className="text-black"
              onClick={() => updateParam('page', String(page + 1))}
              disabled={page === pageCount}
            >
              Вперед
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PaymentsTable;
