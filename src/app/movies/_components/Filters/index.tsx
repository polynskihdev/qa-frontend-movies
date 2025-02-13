import CreatedAtFilter from './CreatedAtFilter';
import GenresFilter from './GenresFilter';
import LocationFilter from './LocationFilter';

function Filters() {
  return (
    <div className="w-full flex gap-5">
      <div className="flex h-full gap-5 items-center">
        <p>Фильтры:</p>
        <LocationFilter />
        <GenresFilter />
      </div>
      <div className="flex h-full gap-5 items-center">
        <p>Сортировка:</p>
        <CreatedAtFilter />
      </div>
    </div>
  );
}

export default Filters;
