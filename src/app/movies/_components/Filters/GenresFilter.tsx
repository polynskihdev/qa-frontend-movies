'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import { useQuery } from '@tanstack/react-query';
import MoviesService from '@api/services/MoviesService/service';

function GenresFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data: genres } = useQuery(['genres'], () => MoviesService.getGenres({}));

  const paramGenreId = searchParams.get('genreId') ?? '';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('genreId', value);
    params.set('page', '1');

    if (value === 'all') {
      params.delete('genreId');
    }

    const newParams = params.toString();

    router.replace(`${pathname}?${newParams}`);
  };

  return (
    <div className="w-36">
      <Select
        value={paramGenreId}
        onValueChange={handleChange}
        data-qa-id="movies_filter_genre_select"
      >
        <SelectTrigger value={paramGenreId}>
          <SelectValue placeholder="Жанр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          {genres ? genres.map((genre) => (
            <SelectItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </SelectItem>
          )) : null}
        </SelectContent>
      </Select>
    </div>
  );
}

export default GenresFilter;
