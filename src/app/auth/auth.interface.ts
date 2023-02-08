import { MoviesCard } from '../domain/movies/movies.interface';

export type AccountType = 'user' | 'admin' | null;

type Loader = LoaderSuccess | LoaderFailed | LoaderPending | LoaderInitial;

export interface AuthState {
  isLogged: boolean;
  accountType: AccountType;
  id: number | null;
  data: Data | null;
  loader: Loader;
}

export interface Data {
  userFirstName: string;
  userLastName: string;
  userPhone?: string;
  userEmail: string;
}

export interface LoaderSuccess {
  status: 'success';
  successMessage?: string;
}

export interface LoaderFailed {
  status: 'failed';
  errorMessage: string;
}

export interface LoaderPending {
  status: 'pending';
}

export interface LoaderInitial {
  status: 'initial';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  accessToken: string;
  user: User;
}

export interface User {
  accountType: AccountType;
  email: string;
  id: number;
  userData: UserData;
}

export interface UserData {
  userFirstName: string;
  userLastName: string;
  userPhoneNumber?: string;
  userWishList: MoviesCard[];
}
