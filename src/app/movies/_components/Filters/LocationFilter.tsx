'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Location } from '@lib/types';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const locations = Object.values(Location);

function LocationFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const locationParam = searchParams.get('locations') || '';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('locations', value);
    params.set('page', '1');

    if (value === 'all') {
      params.delete('locations');
    }

    const newParams = params.toString();

    router.replace(`${pathname}?${newParams}`);
  };

  return (
    <div className="w-36">
      <Select value={locationParam} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Место" data-qa-id="movies_filter_location_select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default LocationFilter;
