'use client';

import Link from 'next/link';

import { Button } from '@components/ui/button';

import { useQuery } from '@tanstack/react-query';
import MoviesService from '@api/services/MoviesService/service';
import MovieCard from './_components/MovieCard';

function Home() {
  const { data } = useQuery(['getMoviesHome'], () => MoviesService.getMovies({
    params: { createdAt: 'desc', page: 1, pageSize: 9 },
  }));

  const { movies } = data || {};

  if (!Array.isArray(movies) || movies?.length === 0) {
    return null;
  }

  return (
    <main className="py-10">
      <h2 className="text-4xl">Последние фильмы</h2>
      <div className="mt-10 grid grid-cols-3 gap-10">
        {movies.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </div>

      <div className="w-full mt-10 flex justify-end">
        <Link href="/movies">
          <Button className="bg-blue-500 hover:bg-blue-600">Показать еще</Button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
