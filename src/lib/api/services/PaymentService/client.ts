import { BACKEND_URL_PAYMENT } from '@lib/consts';
import inMemoryJWT from '@lib/inMemoryJWT';
import axios from 'axios';

const PaymentClient = axios.create({
  baseURL: BACKEND_URL_PAYMENT,
});

PaymentClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default PaymentClient;
