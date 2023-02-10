import { createReducer, on } from '@ngrx/store';
import { WatchlistActions } from './watchlist.actions';
import { initialWatchlistState } from './watchlist.state';

export const watchlistReducer = createReducer(
  initialWatchlistState,
  on(WatchlistActions.addWatchlist, (state, action) => ({
    ...state,
    userWatchlist: [...action.userWatchList],
  })),

  on(WatchlistActions.addMovieToWatchlist, (state, action) => ({
    ...state,
    userWatchlist: [...state.userWatchlist, action],
  })),

  on(WatchlistActions.removeMovieFromWatchlist, (state, action) => {
    const filteredWatchlist = state.userWatchlist.filter(
      (userWatchlist) => userWatchlist.id !== action.userWatchListId
    );

    return {
      ...state,
      userWatchlist: filteredWatchlist,
    };
  })
);
