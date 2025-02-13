interface RatingProps {
  rating: number;
}

function Rating({ rating }: RatingProps) {
  return (
    <div className="mt-5">
      <h3 className="text-xl">
        Рейтинг:
        {' '}
        <span className="underline">
          {rating}
          /5
        </span>
      </h3>
    </div>
  );
}

export default Rating;
