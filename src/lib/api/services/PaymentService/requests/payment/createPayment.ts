import { AxiosCustomRequestConfig } from '@api/types';
import { Payment } from '@lib/types';
import PaymentClient from '@api/services/PaymentService/client';

type CardInfo = {
  cardNumber: string;
  cardHolder: string;
  securityCode: number;
  expirationDate: string;
};

export interface CreatePaymentParams {
  movieId: number;
  amount: number;
  card: CardInfo;
}

export type CreatePaymentConfig = AxiosCustomRequestConfig<CreatePaymentParams>;

export const createPayment = async ({ params, config }: CreatePaymentConfig) => PaymentClient.post<Payment>('/create', params, config);
