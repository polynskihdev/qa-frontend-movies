import { Suspense } from 'react';
import MoviesTable from './_components/Table';
import MovieCreate from './_components/MovieCreate';
import MovieFilters from './_components/MovieFilters';

function DashboardMoviesPage() {
  return (
    <div>
      <Suspense>
        <div className="flex justify-between">
          <h2 className="text-4xl">Фильмы</h2>
          <div className="flex justify-between">
            <MovieFilters />
            <MovieCreate />
          </div>
        </div>
        <MoviesTable />
      </Suspense>
    </div>
  );
}

export default DashboardMoviesPage;
