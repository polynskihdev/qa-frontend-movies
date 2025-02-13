'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

function CreatedAtFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [createdAtParam, setCreatedAtParam] = useState<string>(searchParams.get('createdAt') || '');

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('createdAt', value);
    params.set('page', '1');
    const newParams = params.toString();

    setCreatedAtParam(value);

    router.replace(`${pathname}?${newParams}`);
  };

  return (
    <div className="w-36">
      <Select value={createdAtParam} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Создано" data-qa-id="movies_filter_created_at_select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Новые</SelectItem>
          <SelectItem value="asc">Старые</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CreatedAtFilter;
