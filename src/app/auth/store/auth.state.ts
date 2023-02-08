import { AuthState } from '../auth.interface';

export const initialAuthState: AuthState = {
  isLogged: false,
  id: null,
  accountType: null,
  data: {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
  },
  loader: {
    status: 'initial',
  },
};
