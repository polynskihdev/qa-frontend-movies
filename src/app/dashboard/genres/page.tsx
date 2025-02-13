'use client';

import { Suspense } from 'react';
import GenresTable from './_components/Table';
import GenreCreate from './_components/GenreCreate';

function DashboardGenresPage() {
  return (
    <div>
      <Suspense>
        <div className="flex justify-between">
          <h2 className="text-4xl">Жанры</h2>
          <GenreCreate />
        </div>
        <GenresTable />
      </Suspense>
    </div>
  );
}

export default DashboardGenresPage;
