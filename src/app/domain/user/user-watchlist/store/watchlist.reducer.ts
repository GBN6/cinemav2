import { createReducer, on } from '@ngrx/store';
import { WatchlistActions, WatchlistAPIActions } from './watchlist.actions';
import { initialWatchlistState } from './watchlist.state';

export const watchlistReducer = createReducer(
  initialWatchlistState,

  on(WatchlistAPIActions.fetchUserwacthlistSuccess, (state, action) => ({
    ...state,
    userWatchlist: [...action.userWatchList],
  })),

  on(WatchlistAPIActions.addMovieToWatchlistSuccess, (state, action) => ({
    ...state,
    userWatchlist: [...state.userWatchlist, action.userWatchlist],
  })),

  on(WatchlistAPIActions.removeMovieFromWatchlistSuccess, (state, action) => {
    const filteredWatchlist = state.userWatchlist.filter(
      (userWatchlist) => userWatchlist.id !== action.userWatchListId
    );

    return {
      ...state,
      userWatchlist: filteredWatchlist,
    };
  })
);
