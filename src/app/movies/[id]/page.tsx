'use client';

import { notFound } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import MoviesService from '@api/services/MoviesService/service';
import Rating from './_components/Rating';

import BuyTicketButton from './_components/BuyTicketButton';
import Reviews from './_components/Reviews';

function MoviePage({ params }: { params: { id: string } }) {
  const { data, isError } = useQuery(
    ['movieById'],
    () => MoviesService.getMovieById({ params: { id: Number(params.id) } }),
  );

  if (isError) {
    notFound();
  }

  if (!data) return null;

  const {
    id,
    name,
    description,
    imageUrl,
    rating,
    genre: { name: genreName },
    reviews,
    price,
  } = data;

  return (
    <main className="py-10">
      <section className="w-full flex justify-between">
        <div className="w-[500px]">
          <h2 className="text-6xl">{name}</h2>
          <p className="mt-10 text-lg">{description}</p>
          <p className="text-lg mt-5">
            Жанр:
            {genreName}
          </p>
          <Rating rating={rating} />
          <div className="mt-5">
            <BuyTicketButton movieId={id} price={price} />
          </div>
        </div>
        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              width={500}
              height={500}
              className="w-[300px] max-w-[350px] object-cover rounded-lg"
            />
          ) : null}
        </div>
      </section>
      <Reviews reviews={reviews} movieId={id} />
    </main>
  );
}

export default MoviePage;
