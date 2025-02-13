import { AxiosCustomRequestConfig } from '@api/types';
import PaymentClient from '@api/services/PaymentService/client';
import { Payment } from '@lib/types';

export type GetUserPaymentsConfig = AxiosCustomRequestConfig;

export const getUserPayments = async ({ config }: GetUserPaymentsConfig) => {
  const response = await PaymentClient.get<Payment[]>('/user', config);

  return response.data;
};
