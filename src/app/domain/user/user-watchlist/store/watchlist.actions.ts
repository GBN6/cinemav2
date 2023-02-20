import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserWatchList } from '../user-watchlist.interface';

export const WatchlistActions = createActionGroup({
  source: 'User Watchlist',
  events: {
    'add watchlist': props<{ userId: number }>(),
    'add movie to watchlist': props<{
      userWatchlist: UserWatchList;
      userId: number;
    }>(),
    'remove movie from watchlist': props<{ userWatchListId: number }>(),
  },
});

export const AuthErrorActions = createActionGroup({
  source: 'Auth error',
  events: {
    'set error': props<{ error: string }>(),
  },
});

export const WatchlistAPIActions = createActionGroup({
  source: 'User Watchlist API',
  events: {
    'fetch userWacthlist success': props<{ userWatchList: UserWatchList[] }>(),
    'fetch userWacthlist failure': emptyProps(),
    'add movie to watchlist success': props<UserWatchList>(),
    'add movie to watchlist failure': emptyProps(),
    'remove movie from watchlist success': props<{ userWatchListId: number }>(),
    'remove movie from watchlist failure': emptyProps(),
  },
});
