export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum Location {
  SPB = 'SPB',
  MSK = 'MSK',
}

export type User = {
  id: string;
  email: string;
  fullName: string;
  verified: boolean;
  banned: boolean;
  roles: Role[];
  createdAt?: Date;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  user: User;
};

export type Review = {
  userId: string;
  text: string;
  rating: number;
  createdAt: Date;
  hidden: boolean;
  user: Pick<User, 'fullName'>;
};

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  location: Location;
  price: number;
  published: boolean;
  genreId: number;
  genre: Pick<Genre, 'name'>;
  createdAt: Date;
  rating: number;
  reviews?: Review[];
};

export interface GetMoviesResponse {
  movies: Movie[];
  count: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export interface GetMoviesParams {
  page?: number | string;
  pageSize?: number | string;
  genreId?: number | string;
  name?: string;
  createdAt?: string;
  published?: boolean | string;
}

export interface GetUsersResponse {
  users: User[];
  count: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export interface GetUsersParams {
  page?: number | string;
  pageSize?: number | string;
  createdAt?: string;
  roles?: Role[];
}

export type Payment = {
  id: number;
  userId: string;
  movieId: number;
  total: number;
  amount: number;
  createdAt: Date;
  status: string;
};

export interface GetPaymentsParams {
  page?: number | string;
  pageSize?: number | string;
  createdAt?: 'desc' | 'asc';
  status?: string;
}

export interface GetPaymentsResponse {
  payments: Payment[];
  count: number;
  page: number;
  pageSize: number;
  pageCount: number;
}
