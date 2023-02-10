import { MoviesCard } from '../../movies/movies.interface';
import { UserWatchList } from '../user-watchlist.interface';

export const watchlistFeatureKey = 'watchlist';

export interface UserWatchlistInitialState {
  userWatchlist: UserWatchList[];
}

export const initialWatchlistState: UserWatchlistInitialState = {
  userWatchlist: [],
};
