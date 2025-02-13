'use client';

import { GetMoviesParams } from '@lib/types';

import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@components/LoadingSpinner';
import { Button } from '@components/ui/button';
import { useRouter } from 'next/navigation';
import MoviesService from '@api/services/MoviesService/service';
import MoviesList from './_components/MoviesList';
import Filters from './_components/Filters';
import MoviesPagination from './_components/MoviesPagination';

function Page({ searchParams }: { searchParams: GetMoviesParams }) {
  const router = useRouter();

  const { data, isFetching, isError } = useQuery(['movies', searchParams], () => {
    const params = { pageSize: 9, createdAt: searchParams.createdAt || 'desc', ...searchParams };

    return MoviesService.getMovies({ params });
  });

  const { movies, pageCount } = data || {};

  if (isError) return null;

  const renderMovies = () => {
    if (isFetching) return null;

    if (!movies || movies?.length === 0) {
      return (
        <div className="flex mt-56 min-h-full justify-center text-center m-auto gap-4 flex-col w-fit">
          <div className=" w-full flex justify-center text-xl">Ничего не найдено</div>
          <Button onClick={() => router.replace('/movies?page=1')}>Сбросить фильтры</Button>
        </div>
      );
    }

    return (
      <>
        <MoviesList movies={movies} />
        <MoviesPagination pageCount={pageCount} />
      </>
    );
  };

  return (
    <>
      <title>Все фильмы</title>
      <main className="py-10">
        <Filters />
        {isFetching && !isError ? <LoadingSpinner className="mt-[100px]" size={50} /> : renderMovies()}
      </main>
    </>
  );
}

export default Page;
