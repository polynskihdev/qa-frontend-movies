'use client';

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@components/ui/card';
import { useContext } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from '@context/AuthProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import MoviesService from '@api/services/MoviesService/service';
import LoadingSpinner from '@components/LoadingSpinner';
import PaymentService from '@api/services/PaymentService/service';
import { SubmitHandler } from 'react-hook-form';
import { PaymentFormSchema } from '@app/payment/components/PaymentFormSchema';
import toast from 'react-hot-toast';
import PaymentForm from './PaymentForm';
import PaymentSuccessCard from './PaymentSuccessCard';

function PaymentCard() {
  const searchParams = useSearchParams();
  const { isLogged, session } = useContext(AuthContext);
  const router = useRouter();

  const {
    data: movie, isError, isFetching,
  } = useQuery(['movieById'], () => MoviesService.getMovieById({
    params: {
      id: Number(searchParams.get('movieId')),
    },
  }));

  const { mutateAsync: createPayment, isLoading, isSuccess } = useMutation(['createPayment'], PaymentService.createPayment);

  const onSubmit: SubmitHandler<PaymentFormSchema> = async (data) => {
    const expirationDate = `${data.card.expirationMonth}/${data.card.expirationYear}`;

    try {
      await createPayment({
        params: {
          movieId: movie?.id || 0,
          amount: data.amount,
          card: {
            ...data.card,
            expirationDate,
          },
        },
      });

      toast.success('Оплата прошла успешно');
    } catch (e: any) {
      switch (e?.response?.status) {
        case 400:
          toast.error('Неверные данные карты');
          break;
        case 404:
          toast.error('Фильм не найден');
          break;
        case 503:
          toast.error('Сервис временно недоступен');
          break;
        default:
          toast.error('Сервис временно недоступен');
          break;
      }
    }
  };

  if (!isLogged && !session) {
    router.push('/login');
  }

  if (isError) {
    notFound();
  }

  if (isFetching) {
    return (
      <LoadingSpinner className="mt-[100px]" size={50} />
    );
  }

  if (!movie) return null;

  const { name, price } = movie;

  if (isSuccess) {
    return <PaymentSuccessCard />;
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Покупка билета</CardTitle>
        <CardDescription className="text-base">{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentForm isLoading={isLoading} price={price} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}

export default PaymentCard;
