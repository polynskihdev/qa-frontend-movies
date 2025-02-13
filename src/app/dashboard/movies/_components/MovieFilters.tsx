'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import {
  usePathname, useRouter, useSearchParams,
} from 'next/navigation';

function MovieFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const updateParam = (name: string, value: string) => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.set('page', '1');
    updatedParams.set(name, String(value));

    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return (
    <ul className="mr-5 flex gap-5">
      <li>
        <Select onValueChange={(value) => updateParam('published', value)} defaultValue="true">
          <SelectTrigger data-qa-id="movie_filter_published_select">
            <SelectValue placeholder="Опубликован" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true" className="cursor-pointer">
              Опубликованы
            </SelectItem>
            <SelectItem value="false" className="cursor-pointer">
              Не публикованы
            </SelectItem>
          </SelectContent>
        </Select>
      </li>

      <li>
        <Select onValueChange={(value) => updateParam('createdAt', value)}>
          <SelectTrigger data-qa-id="movie_filter_created_at_select">
            <SelectValue placeholder="Создано" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc" className="cursor-pointer">
              Новые
            </SelectItem>
            <SelectItem value="asc" className="cursor-pointer">
              Старые
            </SelectItem>
          </SelectContent>
        </Select>
      </li>
    </ul>
  );
}

export default MovieFilters;
