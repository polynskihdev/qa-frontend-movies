'use client';

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

import { useQuery } from '@tanstack/react-query';
import MoviesService from '@api/services/MoviesService/service';
import LoadingSpinner from '@components/LoadingSpinner';
import columns from './columns';

function GenresTable() {
  const { data: genres, isLoading, isError } = useQuery(
    ['genres'],
    () => MoviesService.getGenres({}),
    {
      initialData: [],
    },
  );

  const table = useReactTable({
    data: genres,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    rowCount: genres.length,
  });

  if (isLoading) {
    return (
      <div className="mt-36">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  if (isError) {
    return <p className="text-xl mt-36">Что-то пошло не так</p>;
  }

  return (
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
  );
}

export default GenresTable;
