'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

interface MoviesPaginationProps {
  pageCount?: number;
}

function MoviesPagination({ pageCount }: MoviesPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPageNumber = Number(searchParams.get('page'));

  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  const prevPage = currentPageNumber - 1;
  const nextPage = currentPageNumber + 1;

  if (pageCount === 1 || !pageCount) {
    return null;
  }

  return (
    <Pagination className="w-full flex mr-0 ml-auto justify-end">
      <PaginationContent>
        {currentPageNumber > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={getPageHref(prevPage)} />
          </PaginationItem>
        ) : null}

        {prevPage > 0 ? (
          <PaginationItem>
            <PaginationLink href={getPageHref(prevPage)}>{prevPage}</PaginationLink>
          </PaginationItem>
        ) : null}

        {currentPageNumber ? (
          <PaginationItem>
            <PaginationLink href={getPageHref(currentPageNumber)} isActive>
              {currentPageNumber}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {pageCount >= nextPage ? (
          <PaginationItem>
            <PaginationLink href={getPageHref(nextPage)}>{nextPage}</PaginationLink>
          </PaginationItem>
        ) : null}

        {pageCount > currentPageNumber ? (
          <PaginationItem>
            <PaginationNext href={getPageHref(nextPage)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}

export default MoviesPagination;
