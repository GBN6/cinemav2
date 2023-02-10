import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserWatchList } from '../user-watchlist.interface';

export const WatchlistActions = createActionGroup({
  source: 'User Watchlist',
  events: {
    'add watchlist': props<{ userWatchList: UserWatchList[] }>(),
    'add movie to watchlist': props<UserWatchList>(),
    'remove movie from watchlist': props<{ userWatchListId: number }>(),
  },
});

export const WatchlistAPIActions = createActionGroup({
  source: 'User Watchlist API',
  events: {
    'remove movie from watchlist success': props<{ userWatchListId: number }>(),
    'remove movie from watchlist failure': emptyProps(),
  },
});
