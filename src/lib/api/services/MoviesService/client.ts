import { BACKEND_URL_MOVIES } from '@lib/consts';
import inMemoryJWT from '@lib/inMemoryJWT';
import axios from 'axios';

const MoviesClient = axios.create({
  baseURL: BACKEND_URL_MOVIES,
});

MoviesClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default MoviesClient;
