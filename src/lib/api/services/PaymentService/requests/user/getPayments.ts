import { AxiosCustomRequestConfig } from '@api/types';
import { GetPaymentsParams, GetPaymentsResponse } from '@lib/types';
import PaymentClient from '@api/services/PaymentService/client';

export type GetPaymentsConfig = AxiosCustomRequestConfig<GetPaymentsParams>;

export const getPayments = async ({ params, config }: GetPaymentsConfig) => {
  const response = await PaymentClient.get<GetPaymentsResponse>('/find-all', { params, ...config });

  return response.data;
};
