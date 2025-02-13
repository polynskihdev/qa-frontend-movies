import type { AxiosRequestConfig as AxiosRequestConfigType } from 'axios';

export type AxiosCustomRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: AxiosRequestConfigType }
  : { params: Params; config?: AxiosRequestConfigType };
