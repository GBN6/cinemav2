import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MoviesCard } from 'src/app/domain/movies/movies.interface';
import { LoginApiResponse, LoginData, User } from '../auth.interface';

export const AuthErrorActions = createActionGroup({
  source: 'Auth error',
  events: {
    'set error': props<{ error: string }>(),
  },
});

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<LoginData>(),
    'get user': props<{ userId: number }>(),
    logout: emptyProps(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'login success': props<LoginApiResponse>(),
    'get user success': props<User>(),
  },
});
