import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { TokenService } from './token.service';
import { AuthActions } from './store/auth.actions';
import { UserWatchlistService } from '../domain/user/user-watchlist/user-watchlist.service';
import { WatchlistActions } from '../domain/user/user-watchlist/store/watchlist.actions';

export function fetchLoggedUser() {
  const tokenService = inject(TokenService);
  const userWatchListService = inject(UserWatchlistService);
  const store = inject<Store<AppState>>(Store);

  const { token, decodedToken } = tokenService;

  if (token) {
    if (!tokenService.isTokenExpired() && decodedToken!.sub) {
      store.dispatch(AuthActions.getUser({ userId: +decodedToken!.sub }));
      store.dispatch(
        WatchlistActions.addWatchlist({ userId: +decodedToken!.sub })
      );
      // userWatchListService.getUserWatchlist(+decodedToken!.sub);
    } else if (tokenService.isTokenExpired()) {
      tokenService.removeToken();
    }
  }
}
