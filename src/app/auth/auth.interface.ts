import { MoviesCard } from '../domain/movies/movies.interface';

export interface AuthState {
  isLogged: boolean;
  accountType: AccountType;
  id: number | null;
  data: Data | null;
  loading: Loading;
}

export interface Data {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhone?: string;
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
}

export interface LoadingError {
  status: 'failed';
  errorMessage: string;
}

export interface LoadingPending {
  status: 'pending';
}

export interface LoadingInitial {
  status: 'initial';
}

export type AccountType = 'user' | 'admin' | null;

type Loading = LoadingError | LoadingPending | LoadingInitial;
