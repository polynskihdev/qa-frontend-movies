'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Button } from '@components/ui/button';

import { GetUsersParams, GetUsersResponse } from '@lib/types';
import columns from './columns';

interface UsersTableProps {
  usersResponse: GetUsersResponse | null;
  setFilters: Dispatch<SetStateAction<GetUsersParams>>;
}

function UsersTable({ usersResponse, setFilters }: UsersTableProps) {
  if (!usersResponse) {
    return null;
  }

  const table = useReactTable({
    data: usersResponse.users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: usersResponse.pageCount,
    rowCount: usersResponse.users.length,
  });

  const handleNextPage = () => {
    setFilters((prev) => ({ ...prev, page: usersResponse.page + 1 }));
  };

  const handlePreviousPage = () => {
    setFilters((prev) => ({ ...prev, page: usersResponse.page - 1 }));
  };

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
      {usersResponse.users.length ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-black">
            <p className="text-sm">
              Страница
              {' '}
              {usersResponse.page}
              {' '}
              из
              {' '}
              {usersResponse.pageCount}
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="text-black"
              onClick={handlePreviousPage}
              disabled={usersResponse.page === 1}
            >
              Назад
            </Button>
            <Button
              variant="outline"
              className="text-black"
              onClick={handleNextPage}
              disabled={usersResponse.page === usersResponse.pageCount}
            >
              Вперед
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UsersTable;
