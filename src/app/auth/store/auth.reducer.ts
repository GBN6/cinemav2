import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions, AuthErrorActions } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthApiActions.loginSuccess, (state, action) => ({
    ...state,
    loader: {
      status: 'success',
    },
    isLogged: true,
    accountType: action.user.accountType,
    id: action.user.id,
    data: {
      userEmail: action.user.email,
      userFirstName: action.user.userData.userFirstName,
      userLastName: action.user.userData.userLastName,
    },
  })),

  on(AuthApiActions.getUserSuccess, (state, action) => ({
    ...state,
    loader: {
      status: 'success',
    },
    isLogged: true,
    accountType: action.accountType,
    id: action.id,
    data: {
      userEmail: action.email,
      userFirstName: action.userData.userFirstName,
      userLastName: action.userData.userLastName,
      userPhone: action.userData.userPhoneNumber,
    },
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLogged: false,
    accountType: null,
    id: null,
    data: null,
  })),

  on(AuthErrorActions.setError, (state, { error }) => ({
    ...state,
    loading: {
      status: 'failed',
      errorMessage: error,
    },
  })),

  on(AuthActions.setVisitor, (state) => ({
    ...state,
    accountType: 'visitor',
  }))
);
