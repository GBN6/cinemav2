import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginApiResponse, LoginData, User } from '../auth.interface';

export const AuthLoaderActions = createActionGroup({
  source: 'Auth loader',
  events: {
    'set loading': emptyProps(),
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
